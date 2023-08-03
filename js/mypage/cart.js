// localstorage에 저장된 장바구니 아이템 불러오기
const cartItemsString = localStorage.getItem("cartItems");
const USERTOKENINFO = localStorage.getItem("userToken");

if (USERTOKENINFO == null) {
    location.href = "/html/login.html";
}

// 배열로 변경
const cartData = JSON.parse(cartItemsString) || [];
console.log(cartData);
const cartGoodsFin = document.querySelector(".cart_product_list");
const cartContainer = document.querySelector(".info_cart_product");
const cartImg = document.querySelector(".img_thumbnail");
const priceTotal = document.querySelector(".price_ship > span");

let finSum = 0;

// 장바구니 리스트
cartData.forEach((item) => {
    // 상품별 합계 금액
    const totalFinPrice = item.quantity * item.price;

    // 장바구니 상품 목록 나열하기
    cartGoodsFin.innerHTML += `
        <ul>
            <li class="img_thumbnail">
                <img src="${item.productImageKey}" alt="${item.productName}">
            </li>

            <li class="info_cart_product">
                <span>${item.productName}</span>
                <p>${item.category}</p>
                <p class="prime_price">${item.price.toLocaleString(
                    "ko-KR",
                )}원</p>
                <p class="price">${totalFinPrice.toLocaleString("ko-KR")}원</p>

                <div class="quantity">
                    <input type='button' class="decrease_button"
                        value='-' />
                    <span><input type="text" class="product_button" value="${
                        item.quantity
                    }"></span>
                    <input type='button' class="increase_button" value='+' />
                </div>
            </li>
            <li class="optionl_btn">
                <div class="check_btn">
                    <input type="checkbox" class="check_box" />
                </div>
                <div class="delete_item_btn">
                    <i class="fa-regular fa-trash-can"></i>
                </div>
            </li>
        </ul>`;

    // 총 주문 금액
    finSum += totalFinPrice;
    priceTotal.innerHTML = `${finSum.toLocaleString("ko-KR")}원`;
});

// 장바구니 상품 삭제하기
const deleteItemBtns = document.querySelectorAll(".delete_item_btn");
deleteItemBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        localStorage.removeItem("cartItems");
        cartData.splice(i, 1);
        const newCartData = JSON.stringify(cartData);
        localStorage.setItem("cartItems", newCartData);
        location.reload();
    });
});

// 수량 버튼
const increaseBtns = document.querySelectorAll(".increase_button");
const decreaseBtns = document.querySelectorAll(".decrease_button");
const inputNum = document.querySelectorAll(".product_button");

increaseBtns.forEach((upBtn, i) => {
    upBtn.addEventListener("click", () => {
        let countNum = parseInt(inputNum[i].value);
        countNum++;
        inputNum[i].value = countNum;
        cartData[i].quantity = countNum;
        const newCartData = JSON.stringify(cartData);
        localStorage.setItem("cartItems", newCartData);
        location.reload();
    });
});

decreaseBtns.forEach((downBtn, i) => {
    downBtn.addEventListener("click", () => {
        let countNum = parseInt(inputNum[i].value);
        if (countNum > 1) {
            countNum--;
            inputNum[i].value = countNum;
            cartData[i].quantity = countNum;
            const newCartData = JSON.stringify(cartData);
            localStorage.setItem("cartItems", newCartData);
            location.reload();
        }
    });
});



// 주문하기
const orderBtn = document.getElementsByClassName("button_all")[0];
orderBtn.addEventListener("click", () => {
    location.href = "/html/order.html";
});

// 로그아웃
const sideLogoutBtn = document.getElementsByClassName("side_logout_btn")[0];
sideLogoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("cartItems");
    location.href = "/html/login.html";
});



const selectDelBtn = document.getElementsByClassName("btn_select_del")[0];
const selectPurchaseBtn = document.getElementsByClassName("btn_select_purchase")[0];
const checkBox = document.querySelectorAll(".check_box");

console.log(cartData);


// 선택 삭제
selectDelBtn.addEventListener("click", () => {
    for(let i=0; i < cartData.length; i++) {
        if (checkBox[i].checked) {
            console.log("checked", cartData[i])
            localStorage.removeItem("cartItems");
            cartData.splice(i, 1);
            const newCartData = JSON.stringify(cartData);
            localStorage.setItem("cartItems", newCartData);
            location.reload();
        }
    }
})

// 선택 구매
selectPurchaseBtn.addEventListener("click", () => {
    for(let i=0; i < cartData.length; i++) {
        if (!checkBox[i].checked) {
            console.log("checked", cartData[i])
            localStorage.removeItem("cartItems");
            cartData.splice(i, 1);
            const newCartData = JSON.stringify(cartData);
            localStorage.setItem("cartItems", newCartData);
            location.href = "/html/order.html";
        }
    }
})