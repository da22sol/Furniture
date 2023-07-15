let temp = location.href.split('?');
fetch(`http://kdt-sw-5-team01.elicecoding.com/api/products/${temp[1]}`)
    .then((response) => response.json())
    .then((data) => {
        detailDataArr = data;
        console.log(detailDataArr);
        productContentsMade();
        defaultUpdateTotalPrice();
    });

const quantity = document.querySelector('.quantity');
const increaseBtn = document.querySelector('.increase_quantity');
const decreaseBtn = document.querySelector('.decrease_quantity');
const inputNum = document.querySelector('.text_quantity input');
const priceTotal = document.querySelector('.price_total');
let detailDataArr = [];
const imgProduct = document.querySelector('.img_product');
const detailIn = document.querySelector('.detail_in');
function productContentsMade() {
    imgProduct.innerHTML = `
        <img src="${detailDataArr.productImageKey}" alt="${detailDataArr.productName}">
    `;
    detailIn.innerHTML = `
        <h1>${detailDataArr.productName}</h1>
        <p>${detailDataArr.shortDescription}</p>
        <p>${detailDataArr.price}</p>
    `;
}

function defaultUpdateTotalPrice() {
    priceTotal.innerHTML = `<strong><em>${detailDataArr.price} KRW</em></strong>(1개)`;
}

increaseBtn.addEventListener('click', () => {
    let num = parseInt(inputNum.value);
    num++;
    inputNum.value = num;
    updateTotalPrice(num);
});

decreaseBtn.addEventListener('click', () => {
    let num = parseInt(inputNum.value);
    if (num > 1) {
        num--;
        inputNum.value = num;
        updateTotalPrice(num);
    }
});

// 총 가격 업데이트
function updateTotalPrice(quantity) {
    const priced = parseInt(detailDataArr.price);
    const totalPrice = priced * quantity;
    priceTotal.innerHTML = `<strong><em>${totalPrice} KRW</em></strong>(${quantity}개)`;
}

// 장바구니
const cartBtn = document.querySelector('.button_add');
cartBtn.addEventListener('click', () => {
    addProduct();
    const moveTocart = confirm(
        '상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?',
    );
    if (moveTocart === true) {
        window.location.href = 'cart.html';
    }
});
let cartItems = [];
// (1) 장바구니에 상품을 추가하는 함수
function addProduct() {
    // (1-2) 장바구니에 저장할 배열

    // (2) 로컬 스토리지에서 기존 장바구니 데이터 가져오기
    let isExist = false;

    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
        cartItems = JSON.parse(storedItems);
    }

    // (3) 기존 데이터에 상품 추가
    const product =
        {   productImageKey : detailDataArr.productImageKey,
            category: detailDataArr.categoryId.title,
            productName: detailDataArr.productName,
            price: detailDataArr.price,
            quantity: inputNum.value,
        } || [];

    cartItems.push(product);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
