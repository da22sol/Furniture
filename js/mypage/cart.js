let totalPrice = 0;
const imgInner = document.querySelector('.img_thumbnail');
const mainIn = document.querySelector('.info_cart_product');
function displayCartItems() {
  const request = window.indexedDB.open('myDB', 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(['cart'], 'readonly');
    const objectStore = transaction.objectStore('cart');
    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = function (event) {
      const cartData = event.target.result;

      const cartContainer = document.getElementsByClassName('info_cart_product');
      for (let i = 0; i < cartData.length; i++) {
        const cartItem = cartContainer[i];
        cartItem.innerHTML = `
        <img src="${cartData[i].productImageKey}" alt=${cartData[i].productName}>
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
    };
  };
}

// indexDB
// 전체데이터 조회
function getIdxedDBValues() {
  totalPrice = 0;
  if (window.indexedDB) {
    // 1. DB 열기
    const request = indexedDB.open("artc");

    request.onerror = (e) => console.log(e.target.errorCode);
    request.onsuccess = (e) => {
      // 2. items 저장소 접근
      const db = request.result;
      const objStore = db
        .transaction("items", "readwrite")
        .objectStore("items");
      // 3. items 레코드 개수 확인
      const countRequest = objStore.count();
      countRequest.onsuccess = function () {
        const recordCount = countRequest.result;
        // 4-1. 저장소의 레코드가 0개라면( 장바구니가 비어있다면)
        if (recordCount < 1) {
          imgInner.style.display = 'none';
          mainIn.innerHTML = "";
        }
        // 4-2. 저장소에 레코드가 존재한다면
        else {
          imgInner.style.visibility = "hidden";
          mainIn.innerHTML = "";

          const cursorRequest = objStore.openCursor();
          cursorRequest.onsuccess = (e) => {
            // 5. 커서를 사용해 데이터 접근
            const cursor = e.target.result;
            if (cursor) {
              const value = objStore.get(cursor.key);
              value.onsuccess = (e) => {
                totalPrice += value.result.price * value.result.sales;
               // 8. cursor로 순회
              cursor.continue();
              };
            }
          };
        }
      };
    };
  }
};

// 삭제하기(삭제하기 버튼을 누르면 장바구니가 비워지고 메시지가 나옴 그리고 선택한 것만 지워짐)
const delButton = document.querySelector('.delete_button');
delButton.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.checkbox input[type="checkbox"]');
  const cartListInfo = document.querySelector('.cart_product_list');
  cartListInfo.innerHTML =
    '<p class="empty_cart_message">장바구니에 담은 물건이 없습니다</p>';

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const cartRemove = checkbox.closest('li');
      const orderRemove = checkbox.closest('.button_line');
      orderRemove.remove();
      cartRemove.remove();
    }
  });
});

// 선택상품, 전체상품구매하기 (상품 없음 알림창)
const state = {
  selectedItemExist: false,
};

const checkedBoxes = document.querySelectorAll('.checkbox input[type="checkbox"]');
checkedBoxes.forEach((checkbox) => {
  checkbox.addEventListener('click', () => {
    state.selectedItemExist = checkbox.checked;
    localStorage.setItem('state', JSON.stringify(state));
  });
});

function purchaseAllItems() {
  const cartItemsString = localStorage.getItem('cartItems');
  const cartData = JSON.parse(cartItemsString) || [];

  if (cartData.length > 0) {
    const queryString = cartData
      .map((item) => {
        return `category=${encodeURIComponent(item.category)}&productName=${encodeURIComponent(item.productName)}&searchKeywords=${encodeURIComponent(item.searchKeywords)}&price=${encodeURIComponent(item.price)}&quantity=${encodeURIComponent(item.quantity)}`;
      })
      .join('&');

    window.location.href = `/html/order.html?${queryString}`;
  } else {
    alert('장바구니에 상품이 없습니다');
  }
}

purchaseAllItems();
