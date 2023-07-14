function displayCartItems() {
  const request = window.indexedDB.open('myDB', 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(['cart'], 'readonly');
    const objectStore = transaction.objectStore('cart');
    const getAllRequest = objectStore.getAll();
    const cartContainer = document.getElementsByClassName('info_cart_product')[0];

    getAllRequest.onsuccess = function (event) {
      const cartData = event.target.result;
      if (cartData.length === 0) {
        cartContainer.innerHTML = '장바구니가 비어 있습니다.';
      } else {
        cartContainer.innerHTML = '';
        for (let i = 0; i < cartData.length; i++) {
          cartContainer.innerHTML += `
            <li class="img_thumbnail">
              <img src="${cartData[i].productImageKey}" alt="${cartData[i].productName}">
            </li>
            <span><a href="/">${cartData[i].productName}</a></span>
            <p>${cartData[i].searchKeywords}</p>
            <p class="price">${cartData[i].price}</p>
            <div class="quantity">
              <input type='button' class="decrease_button" value='-' />
              <span><input type="text" class="product_button" value="${cartData[i].quantity}" /></span>
              <input type='button' class="increase_button" value='+' />
            </div>
          `;
        }
      }
    };
  };
}

const cartItemsString = localStorage.getItem('cartItems');
const cartData = JSON.parse(cartItemsString) || [];

const cartContainer = document.getElementsByClassName('info_cart_product');
for (let i = 0; i < cartData.length; i++) {
  const cartItem = cartContainer[i];
  cartItem.innerHTML = '';
  cartItem.innerHTML = `
    <span><a href="/">${cartData[i].productName}</a></span>
    <p>${cartData[i].searchKeywords}</p>
    <p class="price">${cartData[i].price}</p>
    <div class="quantity">
      <input type='button' class="decrease_button" value='-' />
      <span><input type="text" class="product_button" value="${cartData[i].quantity}" /></span>
      <input type='button' class="increase_button" value='+' />
    </div>
  `;
}

// 수량 버튼
const priceTotalInner = document.querySelector('.price_ship span');
priceTotalInner.innerText = cartData[0].price;
const increaseBtn = document.querySelector('.increase_button');
const decreaseBtn = document.querySelector('.decrease_button');
const inputNum = document.querySelector('.product_button');
const priceTotal = document.querySelector('.price_ship span');

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
  const price = parseInt(cartData[0].price.replace(',', ''));
  const totalPrice = price * quantity;
  priceTotal.innerText = `${totalPrice.toLocaleString()}원 (${cartData[0].quantity}개)`;
}

// 전체 선택 함수
const allButton = document.querySelector('.all_button');
const checedCheckbox = document.querySelector('.check_product input[type="checkbox"]');

allButton.addEventListener('click', () => {
  checedCheckbox.checked = !checedCheckbox.checked;
});

// 삭제하기(삭제하기 버튼을 누르면 장바구니가 비워지고 메시지가 나옴 그리고 선택한 것만 지워짐)
const delButton = document.querySelector('.delete_button');
delButton.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll(
    '.check_product input[type="checkbox"]',
  );
  const cartListInfo = document.querySelector('.cart_product_list');
  cartListInfo.innerHTML =
    '<p class="empty_cart_message">장바구니에 담은 물건이 없어요</p>';
  const shipInfo = document.querySelector('.ship');
  shipInfo.style.display = 'none';

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const cartRemove = checkbox.closest('.cart_product_list');
      const orderRemove = checkbox.closest('.button_line');
      cartRemove.remove();
      orderRemove.remove();
    }
});
});

// 선택상품, 전체상품구매하기 (상품 없음 알림창)
const state = {
  selectedItemExist: false,
};

const checkedBoxs = document.querySelectorAll('.check_product input[type="checkbox"]');
checkedBoxs.forEach((checkbox) => {
  checkbox.addEventListener('click', () => {
    state.selectedItemExist = checkbox.checked;
    localStorage.setItem('state', JSON.stringify(state));
  });
});

function purchaseSelectedItems() {
  if (state.selectedItemExist) {
    window.location.href = 'order.html';
  } else {
    alert('선택한 상품이 없습니다');
  }
}
function purchaseAllItems() {
  const cartItemsString = localStorage.getItem('cartItems');
  const cartData = JSON.parse(cartItemsString) || [];

  if (cartData.length > 0) {
    const queryString = cartData.map((item) => {
      return `category=${encodeURIComponent(item.category)}&productName=${encodeURIComponent(item.productName)}&searchKeywords=${encodeURIComponent(item.searchKeywords)}&price=${encodeURIComponent(item.price)}&quantity=${encodeURIComponent(item.quantity)}`;
    }).join('&');

    window.location.href = `/html/order.html?${queryString}`;
  } else {
    alert('장바구니에 상품이 없습니다');
  }
}

