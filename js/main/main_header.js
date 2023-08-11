window.addEventListener('load', () => {
    searchInputEl.value = "";
    sideSearchInputEl.value = "";
});

// 메인 메뉴
const mainManage = document.getElementsByClassName('icon_setting')[0];
const mainUser = document.getElementsByClassName('menu_mypage')[0];
const mainCart = document.getElementsByClassName('icon_shopping')[0];
const sideLoginBtn = document.getElementsByClassName('login_btn')[0];
const sideJoinBtn = document.getElementsByClassName('register_btn')[0];

const userToken = localStorage.getItem('userToken');
const userAdmin = localStorage.getItem('isAdmin');

// 로그인 여부 확인
if (userToken) {
    sideLoginBtn.innerHTML = '로그아웃';
    sideJoinBtn.style.display = 'none';
    sideLoginBtn.addEventListener('click', () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('isAdmin');
    });

    // 사용자 권한 체크
    if (userAdmin == 'true') {
        mainManage.style.display = 'block';
        mainUser.style.display = 'none';
        mainCart.style.display = 'none';
        mainManage.addEventListener('click', () => {
            location.href = '/html/manage_order.html';
        });
    } else {
        mainManage.style.display = 'none';
        mainUser.style.display = 'block';
        mainCart.style.display = 'block';
        mainUser.addEventListener('click', () => {
            location.href = '/html/login_account_management.html';
        });
        mainCart.addEventListener('click', () => {
            location.href = '/html/cart.html';
        });
    }
} else {
    mainManage.style.display = 'none';

    mainUser.addEventListener('click', () => {
        location.href = '/html/login.html';
    });
    mainCart.addEventListener('click', () => {
        location.href = '/html/login.html';
    });
}

// 검색창
const searchEl = document.querySelectorAll('.icon_search')[1];
const searchInputEl = searchEl.querySelector('input');
const searchOnBtn = searchEl.querySelector('i');

const sideSearchEl = document.querySelectorAll('.icon_search')[0];
const sideSearchInputEl = sideSearchEl.querySelector('input');
const sideSearchBtn = sideSearchEl.querySelector('i');

// 사이드 메뉴 검색창

sideSearchBtn.addEventListener('click', () => {
    localStorage.removeItem("searchItem");
    if(!sideSearchInputEl.value == "") {
        fetch(`http://kdt-sw-5-team01.elicecoding.com/api/search?keyword=${sideSearchInputEl.value}`)
        .then((response) => response.json())
        .then((item) => {
            if(item.length == 0) {
                alert("❗️일치하는 상품이 없습니다.")
            } else {
                localStorage.setItem("searchItem", sideSearchInputEl.value);
                location.href = '/html/search.html';
            }
        })
    }
})

// 헤더 메뉴 검색창
searchEl.addEventListener('click', () => {
    searchInputEl.focus();

    searchInputEl.style.width = "150px";
    searchEl.style.width = "200px";
    searchEl.style.border = "2px solid #E3DBEB"; 
});

searchOnBtn.addEventListener('click', () => {
    localStorage.removeItem("searchItem");
    if(!searchInputEl.value == "") {
        fetch(`http://kdt-sw-5-team01.elicecoding.com/api/search?keyword=${searchInputEl.value}`)
        .then((response) => response.json())
        .then((item) => {
            if(item.length == 0) {
                alert("❗️일치하는 상품이 없습니다.")
            } else {
                localStorage.setItem("searchItem", searchInputEl.value);
                location.href = '/html/search.html';
            }
        })
    }
})


