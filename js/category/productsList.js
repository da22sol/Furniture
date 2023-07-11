// 임의 상품 목록 객체 배열
const productsListArr = [
    {
        id: 'bed',
        brand: 'brand 1',
        name: 'product 1',
        upload_date: 20230714,
        price: 1000,
    },
    {
        id: 'bed',
        brand: 'brand 2',
        name: 'product 2',
        upload_date: 20230712,
        price: 5000,
    },
    {
        id: 'bed',
        brand: 'brand 3',
        name: 'product 3',
        upload_date: 20230711,
        price: 8000,
    },
    {
        id: 'bed',
        brand: 'brand 4',
        name: 'product 4',
        upload_date: 20230713,
        price: 20000,
    },
    {
        id: 'sofa',
        brand: 'brand 5',
        name: 'product 소파 5',
        upload_date: 20230713,
        price: 250000,
    },
    {
        id: 'sofa',
        brand: 'brand 6',
        name: 'product 소파 6',
        upload_date: 20230713,
        price: 300000,
    },
    {
        id: 'table',
        brand: 'brand 6',
        name: 'product 식탁 6',
        upload_date: 20230713,
        price: 210000,
    },
    {
        id: 'closet',
        brand: 'brand 6',
        name: 'product 옷장',
        upload_date: 20230713,
        price: 120000,
    },
    {
        id: 'drawer',
        brand: 'brand 6',
        name: 'product 협탁',
        upload_date: 20230713,
        price: 40000,
    },
    {
        id: 'desk',
        brand: 'brand 6',
        name: 'product 책상',
        upload_date: 20230713,
        price: 30000,
    },
    {
        id: 'bookshelf',
        brand: 'brand 6',
        name: 'product 책장',
        upload_date: 20230713,
        price: 15000,
    },
];

const listFilterNew = document.getElementById('list_filter_new');
const listFilterHighPrice = document.getElementById('list_filter_high');
const listFilterLowPrice = document.getElementById('list_filter_low');

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

// 상품 동적 추가 함수
function productMade(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById('list_category_sale').innerHTML += `
        <li class="li_products">
            <a href="/">
                <span class="img_sale_product">
                    <!-- 이미지 넣기 -->
                    <img alt="상품이미지"></img>
                </span>
                <strong>
                    ${data[i].brand}
                </strong>
                <p class="text_product_name">
                    ${data[i].name}
                </p>
                <p>
                    ${data[i].price}
                </p>
            </a>
        </li>
        `;
    }
}

// 상품 초기화 함수
function productReset() {
    document.getElementById('list_category_sale').innerHTML = '';
}

// 기본 목록 보여주기
productMade(productsListArr);

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

const filterDrop = document.querySelector('.filter_drop');
const filterSelectesd = document.querySelector('.filter_selected');
const filterList = document.querySelector('.list_filter');

// 필터 보이기
filterDrop.addEventListener('click', () => {
    filterList.classList.toggle('display');
});

// export default {
//     totalCount,
//     totalCountLen,
//     totalProducts,
//     filterDrop,
//     filterList,
//     listFilterNew,
//     listFilterHighPrice,
//     listFilterLowPrice,
// };
