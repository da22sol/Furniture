// 메인 메뉴
const mainManage = document.getElementsByClassName("icon_setting")[0];
const mainUser = document.getElementsByClassName("menu_mypage")[0];
const mainCart = document.getElementsByClassName("icon_shopping")[0];
const sideLoginBtn = document.getElementsByClassName("login_btn")[0];
const sideJoinBtn = document.getElementsByClassName("register_btn")[0];

const userToken = localStorage.getItem("userToken");
const userAdmin = localStorage.getItem("isAdmin");

// 로그인 여부 확인
if (userToken) {
    sideLoginBtn.innerHTML = "로그아웃";
    sideJoinBtn.style.display = "none";
    sideLoginBtn.addEventListener("click", () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("isAdmin");
    })

    // 사용자 권한 체크
    if (userAdmin == "true") {
        mainManage.style.display = "block";
        mainUser.style.display = "none";
        mainCart.style.display = "none";
        mainManage.addEventListener("click", () => {
            location.href = "/html/manage_order.html";
        });
    } else {
        mainManage.style.display = "none";
        mainUser.style.display = "block";
        mainCart.style.display = "block";
        mainUser.addEventListener("click", () => {
            location.href = "/html/login_account_managemnet.html";
        });
        mainCart.addEventListener("click", () => {
            location.href = "/html/cart.html";
        });
    }
} else {
    mainManage.style.display = "none";

    mainUser.addEventListener("click", () => {
        location.href = "/html/login.html";
    });
    mainCart.addEventListener("click", () => {
        location.href = "/html/login.html";
    });
}


// 검색창
const searchEl = document.querySelector(".icon_search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", () => {
    searchInputEl.focus();
});

searchInputEl.addEventListener("blur", () => {
    searchInputEl.value = "";
})
