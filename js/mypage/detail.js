const totalCount = document.querySelector('.sprice_total');

// 더미데이터
const detailData = [
  {
    category: 'closet',
    productName: 'KLEPPSTAD 클렙스타드',
    searchKeywords: '옷장+도어3, 화이트',
    price: '350000',
    quantity: 1,
},
];

const infoData = [
  {
    shortDescription:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nulla praesentium facilis maiores quae excepturi quisquam molestiae? Amet harum excepturi nisi. Reiciendis non ut error nulla velit, obcaecati nostrum quos.',
  },
];
const detailContainer = document.querySelector('.detail_in');
for (let i = 0; i < detailData.length; i++) {
  const data = detailData[i];
  detailContainer.innerHTML = '';
  detailContainer.innerHTML = `
        <h1>${data.productName}</h1>
        <br>
        <p>${data.searchKeywords}</p>
        <p>${data.price}</p>
    `;
}
const inforContainer = document.querySelector('.info_detail');
const createInfoHTML = (item) => `
    <p>${item.shortDescription}</p>
`;

const infoContainer = document.querySelector('.info_detail');
infoContainer.innerHTML = createInfoHTML(infoData);

const priceTotalElement = document.querySelector('.price_total');
priceTotalElement.innerHTML = '<strong><em>350,000</em></strong>';

// 버튼 클릭시 input값 증감, 토탈값 증감
const increaseBtn = document.querySelector('.increase_quantity');
const decreaseBtn = document.querySelector('.decrease_quantity');
const inputNum = document.querySelector('.text_quantity input');
const priceTotal = document.querySelector('.price_total');

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

function updateTotalPrice(quantity) {
  const price = parseInt(detailData[0].price.replace(',', ''));
  const totalPrice = price * quantity;
  priceTotal.innerHTML = `<strong><em>${totalPrice.toLocaleString()} KRW</em></strong>(${quantity}개)`;
}

// 장바구니 넣기
const addCart = (event) => {
  event.preventDefault();
  // 선택한 상품 정보 가져오기
  const selectedProduct = {
    category: detailData[0].category,
    productName: detailData[0].productName,
    searchKeywords: detailData[0].searchKeywords,
    price: detailData[0].price,
    quantity: parseInt(inputNum.value),
  };

  // 장바구니에 상품을 추가
  addProduct(selectedProduct);

  alert('상품이 장바구니에 추가되었습니다.');
  window.location.href = 'cart.html';
};

// (1)장바구니에 상품을 추가하는 함수
function addProduct(item) {
// (1-2)장바구니에 저장할 배열
  let cartItems = [];

  // (2)로컬 스토리지에서 기존 장바구니 데이터 가져오기
  const storedItems = localStorage.getItem('cartItems');
  if (storedItems) {
    cartItems = JSON.parse(storedItems);
  }

  // (3)기존꺼추가해서 보내기
  cartItems.push(item);

  // (4)장바구니 데이터 업데이트
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// (5)전체 상품 데이터 가져오기
const allProducts = [];
for (let i = 0; i < detailData.length; i++) {
  const product = {
    category: detailData[i].category,
    productName: detailData[i].productName,
    searchKeywords: detailData[i].searchKeywords,
    price: detailData[i].price,
    quantity: detailData[i].quantity,
  };
  allProducts.push(product);
}

// 바로구매
const buyButton = document.querySelector('.button_buy');
buyButton.addEventListener('click', () => {
  // 로컬 스토리지 데이터 가져오기
  const cartItemsString = localStorage.getItem('cartItems');
  const cartData = JSON.parse(cartItemsString) || [];

  // 로컬 스토리지 데이터를 query parameter로 변환
  const queryString = cartData
    .map((item) => {
      return `category=${encodeURIComponent(item.category)}&productName=${encodeURIComponent(
        item.productName
      )}&searchKeywords=${encodeURIComponent(item.searchKeywords)}&price=${encodeURIComponent(
        item.price
      )}&quantity=${encodeURIComponent(item.quantity)}`;
    })
    .join('&');

  // order.html로 이동
  window.location.href = `/html/order.html?${queryString}`;
});