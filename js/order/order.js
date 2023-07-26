// 배송지
const orderAddr = document.getElementsByClassName("addr_search_zipcode")[0];
const receiverNameInput = document.getElementsByClassName("addr_info_name")[0];
const receiverPhoneInput1 = document.getElementsByClassName("addr_phone1")[0];
const receiverPhoneInput2 = document.getElementsByClassName("addr_phone2")[0];
const receiverPhoneInput3 = document.getElementsByClassName("addr_phone3")[0];
const zipcodeInput = document.getElementsByClassName("addr_zipcode")[0];
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

        // 장바구니 물건 가져오기
        const userOrderFinList = JSON.parse(localStorage.getItem("cartItems"));
        console.log(userOrderFinList)
    
        // 상품 주문하기
        let totalQuan = 0;
        let totalSum = 0;

        for (let i = 0; i < userOrderFinList.length; i++) {
            // 주문 상품 목록
            let sum = userOrderFinList[i].price * userOrderFinList[i].quantity;
            totalQuan += userOrderFinList[i].quantity;
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
                user: loginUserdata._id,
                totalPrice: totalSum,
                status: "주문완료",
            };

            const orderDataJson = JSON.stringify(userOrderDetail);

            // let productNameList = "";
            // userOrderFinList.forEach((item)=>{
            //     productNameList += item.productName
            // })
            // console.log(productNameList)

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
                    
                    if (orderData.status == "주문완료") {
                        // 주문 상품 리스트 가져오기

                        // 주문 상세 정보 보내기
                        // 객체
                        const userOrderDetailInfo = {
                            orderId: orderData._id,
                            productId: userOrderFinList[0].productId,
                            productName: userOrderFinList[0].productName,
                            quantity: totalQuan,
                            totalPrice: totalSum,
                            _id: orderData.user,
                        };

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
