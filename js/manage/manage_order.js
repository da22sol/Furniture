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


// 전체 회원 정보 불러오기

fetch("http://kdt-sw-5-team01.elicecoding.com/api/admin/orderslist", {
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
        
    });

