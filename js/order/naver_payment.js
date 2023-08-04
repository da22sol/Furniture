// 현재 로그인 되어 있는 계정 토큰 불러오기
const USERTOKEN = localStorage.getItem("userToken");


const allLinks = document.querySelectorAll('a');
allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

const userName = document.getElementsByClassName("name")[0];
const userEmail = document.getElementsByClassName("eng_name")[0];
const itemName = document.getElementsByClassName("heading")[0];
const itemPrice = document.getElementsByClassName("amount")[0];
const totalPrice1 = document.getElementsByClassName("_totalPayAmt")[0];
const totalPrice2 = document.getElementsByClassName("total_price")[0];
const useAllPointBtn = document.getElementsByClassName("use_all_point")[0];
const pointCancelBtn = document.getElementsByClassName("use_point_cancel")[0];
const usePoint = document.getElementsByClassName("use_point")[0];
const usePartPoint = document.getElementsByClassName("use_part_point")[0];
const totalPayment = document.getElementsByClassName("total_payment")[0];
const totalPriceFin = document.getElementsByClassName("total_price_fin")[0];
const givenPoint = document.getElementsByClassName("given_point")[0];
const mileage = document.getElementsByClassName("naver_mileage")[0];

const cardList = document.querySelectorAll(".card-list");

const givePoint = 50000;

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
        console.log(loginUserdata);
        
        const maskedName = loginUserdata.fullName;
        userName.innerHTML = maskedName;
        userEmail.innerHTML = `(${loginUserdata.email})`;
    });

fetch("http://kdt-sw-5-team01.elicecoding.com/api/orderslist", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${USERTOKEN}`,
    },
})
    .then((res) => res.json())
    .then((orderData) => {
        console.log(orderData[orderData.length-1]);

        fetch(`http://kdt-sw-5-team01.elicecoding.com/api/ordersitemlist/${orderData[orderData.length-1]._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${USERTOKEN}`,
            },
        })
            .then((res) => res.json())
            .then((itemData) => {
                console.log(itemData)
                if(itemData[0].quantity == 1) {
                    itemName.innerHTML = itemData[0].productName;
                } else {
                    itemName.innerHTML = `${itemData[0].productName} 외 ${itemData[0].quantity-1}개`;
                }
                itemPrice.innerHTML = `${itemData[0].orderId.totalPrice.toLocaleString("ko-KR")}원`;
                totalPrice1.innerHTML = itemData[0].orderId.totalPrice.toLocaleString("ko-KR");
                totalPrice2.innerText = `${itemData[0].orderId.totalPrice.toLocaleString("ko-KR")}원`;
                totalPayment.innerText = (itemData[0].orderId.totalPrice).toLocaleString("ko-KR");
                givenPoint.innerText = givePoint.toLocaleString("ko-KR");
                mileage.innerText = (itemData[0].orderId.totalPrice * 0.01).toLocaleString("ko-KR");
                
                // 보유 포인트 모두 사용하기
                useAllPointBtn.addEventListener("click", () => {
                    usePoint.value = givePoint.toLocaleString("ko-KR");
                    givenPoint.innerText = 0;
                    usePartPoint.innerText = usePoint.value;
                    totalPayment.innerText = (itemData[0].orderId.totalPrice - 50000).toLocaleString("ko-KR");
                    totalPriceFin.innerText = (itemData[0].orderId.totalPrice - 50000).toLocaleString("ko-KR");
                    mileage.innerText = ((itemData[0].orderId.totalPrice - 50000) * 0.01).toLocaleString("ko-KR");
                })

                // 포인트 사용 취소하기
                pointCancelBtn.addEventListener("click", () => {
                    usePoint.value = "";
                    givenPoint.innerText = givePoint.toLocaleString("ko-KR");
                    usePartPoint.innerText = 0;
                    totalPayment.innerText = (itemData[0].orderId.totalPrice).toLocaleString("ko-KR");
                    totalPriceFin.innerText = (itemData[0].orderId.totalPrice).toLocaleString("ko-KR");
                    mileage.innerText = (itemData[0].orderId.totalPrice * 0.01).toLocaleString("ko-KR");
                })

                // 일부 포인트 사용하기
                usePoint.addEventListener('blur', () => {
                    if(usePoint.value > givePoint) {
                        alert("❗️보유 포인트를 확인해주세요.");
                        usePoint.value = "";
                    }

                    let sum = Number(itemData[0].orderId.totalPrice - usePoint.value);
                    givenPoint.innerText = (givePoint - usePoint.value).toLocaleString("ko-KR");
                    usePoint.value = Number(usePoint.value).toLocaleString("ko-KR");
                    usePartPoint.innerText = usePoint.value;
                    totalPayment.innerText = sum.toLocaleString("ko-KR");
                    totalPriceFin.innerText = sum.toLocaleString("ko-KR");
                    mileage.innerText = (sum * 0.01).toLocaleString("ko-KR");
                });

                usePoint.addEventListener("focus", () => {

                    let numberString = usePoint.value.replace(/[^\d.-]/g, '');
                    let number = parseFloat(numberString);
                    usePoint.value = Number(number);
                })
            })
    })

// 주문완료 모달창 (diplay = "none")
const orderFinModal = document.getElementById("order_success");
const orderModalBtn = document.getElementsByClassName("btn_order_success")[0];
const payBtn = document.getElementsByClassName("naver_pay_btn")[0];

payBtn.addEventListener("click", () => {
    orderFinModal.style.display = "block";
})

orderModalBtn.addEventListener("click", () => {
    location.href = "/html/order_tracking.html";
});

// 카드사 선택
cardList.forEach((item) => {
    item.addEventListener("click", () => {
        for(let i = 0; i < cardList.length; i++) {
            cardList[i].classList.remove("select_on");
        }
        item.classList.add("select_on");
    })
})