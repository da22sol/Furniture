const orderGoods = [
    {
        productImg: "",
        productName: "소파",
        price: 2000,
        quantity: 2,
    },
    {
        productImg: "",
        productName: "침대",
        price: 5000,
        quantity: 1,
    }
]

const shipAddrInfo = [
    {
        fullName: "김사수",
        phoneNumber: "01012345678",
        postalCode: "000111",
        address1: "oo시 00구 00동",
        address2: "oo아파트 101동 1004호",
    }
]

// 유저 목록 불러오기 
const USERNAME_KEY = "fullName";
const savedUserName = localStorage.getItem(USERNAME_KEY);
const USERPHONE_KEY = "phoneNumber";
const savedUserPhone = localStorage.getItem(USERPHONE_KEY);

// 장바구니 목록 불러오기
const CARTITEM_KEY = "cartItems";
let cartItems = [
    {
        productName: "의자",
        price: 1200,
        quantity: 2,
    },
    {
        productName: "책상",
        price: 100,
        quantity: 20,
    },
    {
        productName: "소파",
        price: 10000,
        quantity: 5,
    },
]
localStorage.setItem(CARTITEM_KEY, JSON.stringify(cartItems));
const savedOrder = JSON.parse(localStorage.getItem(CARTITEM_KEY));


// 이동
const moveCartBtn = document.getElementsByClassName("movecart")[0];
const purchaseBtn = document.getElementsByClassName("purchase")[0];
const orderModalBtn = document.getElementsByClassName("btn_order_success")[0];

// 모달창
const orderFinModal = document.getElementById("order_success");

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

// 장바구니 페이지로 이동
moveCartBtn.addEventListener("click", () => {
    location.href = "/html/cart.html";
});

// 주문 완료 후 주문 조회 페이지로 이동
orderModalBtn.addEventListener("click", () => {
    location.href = "/html/order_tracking.html";
});

// 주문자 정보
userOrderInfo.innerHTML += `
    <li>${savedUserName}</li>
    <li>${savedUserPhone}</li>
`;
// 배송지 정보
receiverNameInput.value += `${shipAddrInfo[0].fullName}`;
receiverPhoneInput1.value += `${shipAddrInfo[0].phoneNumber.slice(0, 3)}`;
receiverPhoneInput2.value += `${shipAddrInfo[0].phoneNumber.slice(3, 7)}`;
receiverPhoneInput3.value += `${shipAddrInfo[0].phoneNumber.slice(7, 11)}`;
zipcodeInput.value += `${shipAddrInfo[0].postalCode}`;
addrInput1.value += `${shipAddrInfo[0].address1}`;
addrInput2.value += `${shipAddrInfo[0].address2}`;

// 다음 주소 API
orderAddr.addEventListener("click", () => {
    new daum.Postcode({
        oncomplete: function (data) {
            let addr = ""; // 주소 변수
            let extraAddr = ""; // 참고항목 변수

            if (data.userSelectedType === "R") {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            if (data.userSelectedType === "R") {
                if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }

                if (data.buildingName !== "" && data.apartment === "Y") {
                    extraAddr +=
                        extraAddr !== ""
                            ? ", " + data.buildingName
                            : data.buildingName;
                }

                if (extraAddr !== "") {
                    extraAddr = " (" + extraAddr + ")";
                }
            } else {
                addrInput2.value = "";
            }

            zipcodeInput.value = data.zonecode;
            addrInput1.value = addr;
            addrInput2.focus();
            addrInput2.value = "";
        },
    }).open();
});


// 주문 날짜
let today = new Date();   
let year = today.getFullYear(); // 년도
let month = ("0" + (1 + today.getMonth())).slice(-2);  // 월
let day = ("0" + today.getDate()).slice(-2);  // 날짜
let todayDate = year + month + day;

// 상품 주문하기
let totalSum = 0;

for (let i = 0; i < cartItems.length; i++) {
    // 주문 상품 목록
    let sum = cartItems[i].price * cartItems[i].quantity;
    totalSum += sum;
    orderGoodsList.innerHTML += `
        <div class="order_products_ul">
            <ul class="info_order_list">
                <li class="info_order_name">
                    <img src="../assets/img/thum.png" alt="thumbnail">
                    <span class="name_delivery">${
                        cartItems[i].productName
                    }</span>
                </li>
                <li class="total">
                    <div class="total_box">
                        <p class="price_total">${cartItems[i].price.toLocaleString("ko-KR")}원</p>
                        <span class="count_total">${cartItems[i].quantity.toLocaleString("ko-KR")}개</span>
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
purchaseBtn.addEventListener("click", () => {
    doCheckout();
});

// 주소 정보
function doCheckout() {
    const receiverName = receiverNameInput.value;
    const receiverPhoneNumber =
        receiverPhoneInput1.value +
        receiverPhoneInput2.value +
        receiverPhoneInput3.value;
    const postalCode = zipcodeInput.value;
    const address1 = addrInput1.value;
    const address2 = addrInput2.value;

    const savedProductName = cartItems.map((row) => row.productName);
    const savedProductQuantity = cartItems.map((row) => row.quantity);
    const savedProductPrice = cartItems.map((row) => row.price);

    // 입력이 안 되어 있을 시
    if (!receiverName || !receiverPhoneNumber || !postalCode || !address2) {
        return alert("배송지 정보를 모두 입력해 주세요.");
    }

    // 객체
    const req = {
        fullName: receiverName,
        phoneNumber: receiverPhoneNumber,
        postalCode: postalCode,
        address1: address1,
        address2: address2,
        productName: savedProductName,
        quantity: savedProductQuantity,
        price: savedProductPrice,
        totalPrice: totalSum,
        orderDate: todayDate,
    };

    const dataJson = JSON.stringify(req);


    console.log(req);
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: dataJson,
    })

    if (req.status === 200) {
        orderFinModal.style.display = "block"; // 주문완료 모달창 띄우기
    } else {
        alert("❗️주문실패");
    }
}

export default {
    moveCartBtn,
    orderModalBtn,
    orderAddr,
    purchaseBtn,
    doCheckout,
};
