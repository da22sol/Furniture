// 현재 로그인 되어 있는 계정 토큰 불러오기
const ISADMIN = localStorage.getItem("isAdmin");

window.addEventListener("load", () => {
    if(ISADMIN !== "true") {
        alert("🚫관리자만 접근가능합니다");
        location.href = "/index.html"
    }
});

// 현재 로그인 되어 있는 계정 토큰 불러오기
const USERTOKEN = localStorage.getItem("userToken");

const tableData = document.querySelector(".table");

// 주문 리스트 넣기
const manageOrderList = document.getElementsByClassName("content_box")[0];


// 전체 주문 정보 불러오기

fetch("http://kdt-sw-5-team01.elicecoding.com/api/admin/ordersitemlist", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${USERTOKEN}`,
    },
})
    .then((res) => res.json())
    .then((allOrderData) => {
        // 모든 주문 목록
        console.log(allOrderData);
        
        // 주문 목록 리스트에 넣기
        for (let i = 0; i < allOrderData.length; i++) {
            console.log(allOrderData[i].orderId._id)
            if (allOrderData.length === 0) {
                manageOrderList.innerHTML += "주문정보가 없습니다";
            } else {
                manageOrderList.innerHTML += `
                    <div class="order_box">
                        <div class="order_info">
                            <div class="order_id">주문자 : ${allOrderData[i]._id}</div>
                            <div class="order_date">주문일자 : ${allOrderData[i].createdAt.slice(0, 10)}</div>
                            <div class="order_number">주문 번호 : ${allOrderData[i].orderId._id}</div>
                            <div class="order_state">주문 상태 : ${allOrderData[i].orderId.status}</div>
                        </div>
                        <div class="order_delete_btn">주문취소</div>
                    </div>
                `;
            }
        }

        // 주문 삭제
        const orderDeleteBtns = document.querySelectorAll(".order_delete_btn");
        orderDeleteBtns.forEach((btn, i) => {
            btn.addEventListener("click", function () {
                fetch(
                    `http://kdt-sw-5-team01.elicecoding.com/api/admin/ordersitemlist/${allOrderData[i].orderId._id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${USERTOKEN}`,
                        },
                    },
                )
                    .then((res) => res.json())
                    .then((res) => {
                        alert("주문이 삭제되었습니다!");
                        // location.reload();
                    });
            });
        });



    });

fetch("http://kdt-sw-5-team01.elicecoding.com/api/admin/orderslist", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${USERTOKEN}`,
    },
})
    .then((res) => res.json())
    .then((orderData) => {
        // 모든 주문 목록
        console.log(orderData);
    })




