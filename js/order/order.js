// 배송지
const receiverInfo = document.getElementsByClassName("addr_order_info")[0];
const receiverNameInput = document.getElementsByClassName("addr_info_name")[0];
const receiverPhoneInput1 = document.getElementsByClassName("addr_phone1")[0];
const receiverPhoneInput2 = document.getElementsByClassName("addr_phone2")[0];
const receiverPhoneInput3 = document.getElementsByClassName("addr_phone3")[0];
const zipcodeInput = document.getElementsByClassName("addr_zipcode")[0];
const addrSearchBtn = document.getElementsByClassName("addr_search_zipcode")[0];
const addrInput1 = document.getElementsByClassName("addr_addr1")[0];
const addrInput2 = document.getElementsByClassName("addr_addr2")[0];

// 주문
const orderGoodsList = document.getElementsByClassName("product_pay")[0];
const orderTotalPrice = document.getElementsByClassName("total_price")[0];
const userOrderInfo = document.getElementsByClassName("user_order_info")[0];

// 현재 로그인 되어 있는 계정 토큰 불러오기
const USERTOKEN = localStorage.getItem("userToken");

fetch("http://kdt-sw-5-team01.elicecoding.com/api/account", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${USERTOKEN}`,
    },
})
    .then((res) => res.json())
    .then((loginUserdata) => {
        // 주문자 정보
        userOrderInfo.innerHTML += `
        <li>${loginUserdata.fullName}</li>
        <li>${loginUserdata.phoneNumber}</li>
        `;

        // 배송지 정보
        receiverNameInput.value += `${loginUserdata.fullName}`;
        receiverPhoneInput1.value += `${loginUserdata.phoneNumber.slice(0, 3)}`;
        receiverPhoneInput2.value += `${loginUserdata.phoneNumber.slice(3, 7)}`;
        receiverPhoneInput3.value += `${loginUserdata.phoneNumber.slice(
            7,
            11,
        )}`;
        zipcodeInput.value += `${loginUserdata.address.postalCode}`;
        addrInput1.value += `${loginUserdata.address.address1}`;
        addrInput2.value += `${loginUserdata.address.address2}`;

        let receiverPhoneInput = "";
        receiverPhoneInput = loginUserdata.phoneNumber;
        // 다음 주소 API
        zipcodeApiBtn();

        // 수령자 정보 변경
        
        receiverInfo.addEventListener("input", () => {
            receiverNameInput.value = receiverNameInput.value;
            receiverPhoneInput1.value = receiverPhoneInput1.value;
            receiverPhoneInput2.value = receiverPhoneInput2.value;
            receiverPhoneInput3.value = receiverPhoneInput3.value;
            receiverPhoneInput = receiverPhoneInput1.value + receiverPhoneInput2.value + receiverPhoneInput3.value
            zipcodeInput.value = zipcodeInput.value;
            addrInput1.value = addrInput1.value;
            addrInput2.value = addrInput2.value;
            console.log(receiverNameInput.value);
        })


        // 장바구니 물건 가져오기
        const userOrderFinList = JSON.parse(localStorage.getItem("cartItems"));
        console.log(userOrderFinList)

        // 상품 주문하기
        let totalQuan = 0;
        let totalSum = 0;

        for (let i = 0; i < userOrderFinList.length; i++) {
            // 주문 상품 목록
            let sum = userOrderFinList[i].price * userOrderFinList[i].quantity;
            totalQuan += Number(userOrderFinList[i].quantity);
            totalSum += sum;
            orderGoodsList.innerHTML += `
        <div class="order_products_ul">
            <ul class="info_order_list">
                <li class="info_order_name">
                    <img class="cart_order_img" src="${
                        userOrderFinList[i].productImageKey
                    }" alt="thumbnail">
                    <span class="name_delivery">${
                        userOrderFinList[i].productName
                    }</span>
                </li>
                <li class="total">
                    <div class="total_box">
                        <p class="price_total">${userOrderFinList[
                            i
                        ].price.toLocaleString("ko-KR")}원</p>
                        <span class="count_total">${userOrderFinList[
                            i
                        ].quantity.toLocaleString("ko-KR")}개</span>
                        <p class="all_total">${sum.toLocaleString(
                            "ko-KR",
                        )}원</p>
                    </div>
                </li>
            </ul>
        </div>
    `;
        }
        // 총 결제 금액
        orderTotalPrice.innerHTML += `
    <span>${totalSum.toLocaleString("ko-KR")}원</span>
`;

        // 주문하기 클릭
        const purchaseBtn = document.getElementsByClassName("purchase")[0];

        purchaseBtn.addEventListener("click", () => {
            
            // 객체
            const userOrderDetail = {
                totalPrice: totalSum,
                receiver: receiverNameInput.value,
                phoneNumber: receiverPhoneInput,
                address : {
                    postalCode: zipcodeInput.value,
                    address1: addrInput1.value,
                    address2: addrInput2.value,
                }
            };

            const orderDataJson = JSON.stringify(userOrderDetail);

            // 주문 정보 보내기
            fetch("http://kdt-sw-5-team01.elicecoding.com/api/orderslist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${USERTOKEN}`,
                },
                body: orderDataJson,
            })
                .then((res) => res.json())
                .then((orderData) => {
                        console.log(orderData);
                    if (orderData.status == "주문완료") {
                        // 주문 상품 리스트 가져오기

                        // 주문 상세 정보 보내기
                        // 객체
                        let newArray = [];

                        for (let i = 0; i < userOrderFinList.length; i++) {
                            let a = {
                                orderId: orderData._id,
                                productId: userOrderFinList[i].productId,
                                productName: userOrderFinList[i].productName,
                                quantity: userOrderFinList[i].quantity,
                                totalPrice: userOrderFinList[i].price,
                            };
                        
                            newArray.push(a); // 새로운 배열에 a 객체 추가
                        }
                
                        const userOrderDetailInfo = {
                            orderItems: newArray
                        }

                        const orderDetailDataJson =
                            JSON.stringify(userOrderDetailInfo);
                        

                        fetch(
                            "http://kdt-sw-5-team01.elicecoding.com/api/ordersitem",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${USERTOKEN}`,
                                },
                                body: orderDetailDataJson,
                            },
                        )
                            .then((res) => res.json())
                            .then((orderDetailData) => {
                            });

                        // 주문완료 모달창 띄우기
                        orderFinModal.style.display = "block";
                        localStorage.removeItem("cartItems");
                        
                    } else {
                        alert("주문 실패");
                    }
                });
        });

        // 네이버페이로 주문하기 클릭

        const purchaseNaverBtn =
            document.getElementsByClassName('naver_pay')[0];

        purchaseNaverBtn.addEventListener('click', () => {
            // 객체
            const userOrderDetail = {
                totalPrice: totalSum,
                receiver: receiverNameInput.value,
                phoneNumber: receiverPhoneInput,
                address : {
                    postalCode: zipcodeInput.value,
                    address1: addrInput1.value,
                    address2: addrInput2.value,
                }
            };

            const orderDataJson = JSON.stringify(userOrderDetail);

            // 주문 정보 보내기
            fetch("http://kdt-sw-5-team01.elicecoding.com/api/orderslist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${USERTOKEN}`,
                },
                body: orderDataJson,
            })
                .then((res) => res.json())
                .then((orderData) => {
                        console.log(orderData);
                    if (orderData.status == "주문완료") {
                        // 주문 상품 리스트 가져오기

                        // 주문 상세 정보 보내기
                        // 객체
                        let newArray = [];

                        for (let i = 0; i < userOrderFinList.length; i++) {
                            let a = {
                                orderId: orderData._id,
                                productId: userOrderFinList[i].productId,
                                productName: userOrderFinList[i].productName,
                                quantity: userOrderFinList[i].quantity,
                                totalPrice: userOrderFinList[i].price,
                            };
                        
                            newArray.push(a); // 새로운 배열에 a 객체 추가
                        }
                
                        const userOrderDetailInfo = {
                            orderItems: newArray
                        }

                        const orderDetailDataJson =
                            JSON.stringify(userOrderDetailInfo);
                        

                        fetch(
                            "http://kdt-sw-5-team01.elicecoding.com/api/ordersitem",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${USERTOKEN}`,
                                },
                                body: orderDetailDataJson,
                            },
                        )
                            .then((res) => res.json())
                            .then((orderDetailData) => {
                            });
                        localStorage.removeItem("cartItems");
                        location.href = '../../html/paymentNaver2.html';
                    } else {
                        alert("주문 실패");
                    }
                });
        });

    });

// 주문완료 모달창 (diplay = "none")
const orderFinModal = document.getElementById("order_success");

// 장바구니 페이지로 이동
const moveCartBtn = document.getElementsByClassName("movecart")[0];
moveCartBtn.addEventListener("click", () => {
    location.href = "/html/cart.html";
});

// 주문 완료 후 주문 조회 페이지로 이동
const orderModalBtn = document.getElementsByClassName("btn_order_success")[0];
orderModalBtn.addEventListener("click", () => {
    location.href = "/html/order_tracking.html";
});


// 다음 주소 API
function zipcodeApiBtn() {
    addrSearchBtn.addEventListener('click', () => {
        new daum.Postcode({
            oncomplete: function (data) {
                let addr = ''; // 주소 변수
                let extraAddr = ''; // 참고항목 변수

                if (data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }

                if (data.userSelectedType === 'R') {
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }

                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddr +=
                            extraAddr !== ''
                                ? ', ' + data.buildingName
                                : data.buildingName;
                    }

                    if (extraAddr !== '') {
                        extraAddr = ' (' + extraAddr + ')';
                    }
                } else {
                    addrInput2.value = '';
                }

                document.getElementsByClassName('user_addr_zipcode')[0].value =
                    data.zonecode;
                document.getElementsByClassName('user_addr_addr1')[0].value = addr;
                document.getElementsByClassName('user_addr_addr2')[0].focus();
                document.getElementsByClassName('user_addr_addr2')[0].value = '';
            },
        }).open();
    });
}

