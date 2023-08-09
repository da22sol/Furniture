const searchItem = localStorage.getItem('searchItem');

fetch(`http://kdt-sw-5-team01.elicecoding.com/api/search?keyword=${searchItem}`)
        .then((response) => response.json())
        .then((item) => {
            productsListArr = item;
            productMade(productsListArr);
        })

document.getElementsByClassName("title_search")[0].innerHTML = `"${searchItem}"에 대한 검색결과`

// 상품 목록 배열
let productsListArr = [];

// 상품 동적 추가
function productMade(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById('list_category_sale').innerHTML += `
        <li class="li_products">
            <a id="${data[i]._id}" href="/html/detail.html?${data[i]._id}">
                <span class="img_sale_product">
                    <img src="${
                        data[i].productImageKey
                    }" class="img_sale_product"></img>
                </span>
                <p class="strong">
                    ${data[i].categoryId.title}
                </p>
                <p class="text_product_name">
                    ${data[i].productName}
                </p>
                <p>
                    ${data[i].price.toLocaleString('ko-KR')}원
                </p>
            </a>
        </li>
        `;
    }

    // 상품 개수 세기
    const totalCount = document.getElementsByClassName('li_products');
    const totalProducts = document.querySelector('.total_products');
    const totalCountLen = totalCount.length;

    // 제품의 총개수 구하기
    function totalProduts() {
        return (totalProducts.innerText = `총 ${totalCountLen}개의 상품`);
    }
    totalProduts();
}

// 상품 초기화 기능
function productReset() {
    document.getElementById('list_category_sale').innerHTML = '';
}

// 필터 목록
const filterDrop = document.querySelector('.filter_drop');
const filterSelectesd = document.querySelector('.filter_selected');
const filterList = document.querySelector('.list_filter');

// 필터 버튼
const listFilterNew = document.getElementById('list_filter_new');
const listFilterHighPrice = document.getElementById('list_filter_high');
const listFilterLowPrice = document.getElementById('list_filter_low');

// 필터 보이기 기능
filterDrop.addEventListener('click', () => {
    filterList.classList.toggle('display');
});

// 신상품순 동적 변경
function listFilterNewDateSort(data) {
    const newProductsListArr = [...data];
    newProductsListArr.sort((a, b) => a.createdAt - b.createdAt);
    productReset();
    productMade(newProductsListArr);
}

// 높은 가격순 동적 변경
function listFilterHighPriceSort(data) {
    const newProductsListArr = [...data];
    newProductsListArr.sort((a, b) => b.price - a.price);
    productReset();
    productMade(newProductsListArr);
}

// 낮은 가격순 동적 변경
function listFilterLowPriceSort(data) {
    const newProductsListArr = [...data];
    newProductsListArr.sort((a, b) => a.price - b.price);
    productReset();
    productMade(newProductsListArr);
}

listFilterNew.addEventListener('click', () => {
    filterSelectesd.innerHTML = '신상품순';
    listFilterNewDateSort(productsListArr);
});

listFilterHighPrice.addEventListener('click', () => {
    filterSelectesd.innerHTML = '높은가격순';
    listFilterHighPriceSort(productsListArr);
});

listFilterLowPrice.addEventListener('click', () => {
    filterSelectesd.innerHTML = '낮은가격순';
    listFilterLowPriceSort(productsListArr);
});
