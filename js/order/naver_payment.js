// 현재 로그인 되어 있는 계정 토큰 불러오기
const USERTOKEN = localStorage.getItem("userToken");

const userName = document.getElementsByClassName("name")[0];
const userEmail = document.getElementsByClassName("eng_name")[0];
const itemName = document.getElementsByClassName("heading")[0];
const itemPrice = document.getElementsByClassName("amount")[0];
const totalPrice1 = document.getElementsByClassName("_totalPayAmt")[0];
const totalPrice2 = document.getElementsByClassName("total_price")[0];
const payBtn = document.getElementsByClassName("button_section")[0];
const usePoint = document.getElementById("point2").input;

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
        
        const maskedName = loginUserdata.fullName.slice(0, -1) + '*';
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
                itemPrice.innerHTML = `${itemData[0].orderId.totalPrice.toLocaleString("ko-KR",)}원`;
                totalPrice1.innerHTML = itemData[0].orderId.totalPrice.toLocaleString("ko-KR",);
                totalPrice2.innerText = `${itemData[0].orderId.totalPrice.toLocaleString("ko-KR",)}원`;
            })
    })

// 주문완료 모달창 (diplay = "none")
const orderFinModal = document.getElementById("order_success");
const orderModalBtn = document.getElementsByClassName("btn_order_success")[0];

payBtn.addEventListener("click", () => {
    orderFinModal.style.display = "block";
})

orderModalBtn.addEventListener("click", () => {
    location.href = "/html/order_tracking.html";
});