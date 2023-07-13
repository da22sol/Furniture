fetch('http://kdt-sw-5-team01.elicecoding.com/api//products')
    .then((response) => response.json())
    .then((data) => {
        productsListArr = data;
        productMade(productsListArr);
    });

// 상품 목록 객체 배열
let productsListArr = [];

const listFilterNew = document.getElementById('list_filter_new');
const listFilterHighPrice = document.getElementById('list_filter_high');
const listFilterLowPrice = document.getElementById('list_filter_low');

// 상품 동적 추가 함수
function productMade(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById('list_category_sale').innerHTML += `
        <li class="li_products">
            <a href="/">
                <span class="img_sale_product">
                    <img src="${data[i].productImageKey}" class="img_sale_product"></img>
                </span>
                <strong>
                    ${data[i].categoryId.title}
                </strong>
                <p class="text_product_name">
                    ${data[i].productName}
                </p>
                <p>
                    ${data[i].price}
                </p>
            </a>
        </li>
        `;
    }

    const totalCount = document.getElementsByClassName('li_products');
    const totalProducts = document.querySelector('.total_products');
    const totalCountLen = totalCount.length;

    // 제품의 총 개수 구하기
    function totalProduts() {
        return (totalProducts.innerText = `총 ${totalCountLen}개의 상품`);
    }
    totalProduts();

    // 카테고리별 제품의 총 개수 구하기
    function totalCategorys(len) {
        return (totalProducts.innerText = `총 ${len}개의 상품`);
    }
}

// 상품 초기화 함수
function productReset() {
    document.getElementById('list_category_sale').innerHTML = '';
}

// 기본 목록 보여주기
productMade(productsListArr);

////////////////////////////////////////////////////
const filterDrop = document.querySelector('.filter_drop');
const filterSelectesd = document.querySelector('.filter_selected');
const filterList = document.querySelector('.list_filter');

// 필터 보이기
filterDrop.addEventListener('click', () => {
    filterList.classList.toggle('display');
});

// 신상품순 클릭시 상품 동적 변경 ( 추후 수정 예정 )
// function listFilterNewSort(data) {
//     productReset();
//     console.log(data);
//     const sortArr = data.sort((a, b) => b.upload_date - a.upload_date);
//     productMade(sortArr);
// }

listFilterNew.addEventListener('click', () => {
    filterSelectesd.innerHTML = '신상품순';
    // listFilterNewSort();
});

listFilterHighPrice.addEventListener('click', () => {
    filterSelectesd.innerHTML = '높은가격순';
    // listFilterNewSort();
});

listFilterLowPrice.addEventListener('click', () => {
    filterSelectesd.innerHTML = '낮은가격순';
    // listFilterNewSort();
});
