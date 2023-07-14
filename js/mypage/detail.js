const productImageKey = document.querySelector('.productImageKey');
const productName = document.querySelector('.productName');
const searchKeywords = document.querySelector('.searchKeywords');
const price = document.querySelector('.price');
const quantity = document.querySelector('.quantity');
const increaseBtn = document.querySelector('.increase_quantity');
const decreaseBtn = document.querySelector('.decrease_quantity');
const inputNum = document.querySelector('.text_quantity input');
const priceTotal = document.querySelector('.price_total');
const addBtn = document.querySelector('.button_add');
const buyBtn = document.querySelector('.button_buy');

// <!-- a링크의 id값에 기반한 상세페이지
let temp = location.href.split('?');
console.log(temp);

// 상품의 id값 기반의 상품 정보 받아오기
fetch(`http://kdt-sw-5-team01.elicecoding.com/api/products/${temp[1]}`)
    .then((response) => response.json())
    .then((data) => {
        detailDataArr = data;
        console.log(detailDataArr);
        //상품 상세페이지 생성
        productContentsMade();
        updateTotalPrice(parseInt(inputNum.value));
    });
// -->

const totalCount = document.querySelector('.sprice_total');

let detailDataArr = [];

const imgProduct = document.querySelector('.img_product');
const detailIn = document.querySelector('.detail_in');

function productContentsMade() {
    imgProduct.innerHTML = `
        <img src="${detailDataArr.productImageKey}" alt="${detailDataArr.productName}">`;
    detailIn.innerHTML = `
        <h1>${detailDataArr.productName}</h1>
        <p>${detailDataArr.shortDescription}</p>
        <p>${detailDataArr.price}</p>
            `;
}

//  indexDB
function detailDB(detailBuy, cartName) {
    if (window.indexedDB) {
        const databaseName = 'cart';
        const version = 1;
        const request = indexedDB.open(databaseName, version);

        const data = {
            productImageKey: productImageKey.src,
            productName: productName.innerHTML,
            shortDescription: shortDescription.innerHTML,
            price: convertToNumber(price.innerText),
        };

        request.onupgradeneeded = function () {
            // 장바구니용 objectStore
            request.result.createObjectStore('items', { autoIncrement: true });
            // 바로구매용 objectStore
            request.result.createObjectStore('nowBuy', { keyPath: 'id' });
        };

        request.onsuccess = function () {
            localStorage.setItem('storeName', storeName);
            const objStore = request.result
                .transaction(`${cartName}`, 'readwrite')
                .objectStore(`${cartName}`);
            // 중복상품
            if (cartName == 'items') {
                isExist(data, objStore);
            } else {
                objStore.add(data);
            }
        };
        request.onerror = function (event) {
            alert(event.target.errorCode);
        };
    }
}
console.log(detailDB);
// 구매하기

addBtn.addEventListener('click', () => {
    detailDB(detailBuy, 'items');
    const moveTocart = confirm('장바구나에 담겼습니다?');
    if (moveTocart === true) {
        window.location.href = '/cart';
    }
});

const addCart = (event) => {
    event.preventDefault();
    const selectedProduct = {
        productImageKey: detailDataArr.productImageKey,
        productName: detailDataArr.productName,
        searchKeywords: detailDataArr.searchKeywords,
        price: detailDataArr.price,
        quantity: detailDataArr.quantity,
    };
};

// 바로구매 console log(buyBtn)
// buyBtn.addEventListener('click', function () {
//   if (localStorage.getItem("loggedIn") === "true") {
//       const buyNow = confirm("바로 구매하시겠습니까?");
//       if (buyNow === true) {
//         // console.log("바로구매");
//         saveData(salseCount, "nowBuy");
//         localStorage.setItem("keys", localStorage.getItem("itemDetail"));
//         window.location.href = "/order";
//         return;
//       }
//       return;
//     }
//     alert("로그인을 먼저 해주세요.");
//   });

console.log(increaseBtn);

// 수량확인
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
    const priced = parseInt(price.innerText.replace(',', ''));
    const totalPrice = priced * quantity;
    priceTotal.innerHTML = `<strong><em>${totalPrice.toLocaleString()} KRW</em></strong>(${quantity}개)`;
}
