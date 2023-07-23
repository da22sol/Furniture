fetch('http://kdt-sw-5-team01.elicecoding.com/api/products')
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
            <a id="${data[i]._id}" href="/html/detail.html?${data[i]._id}">
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
                    ${data[i].price.toLocaleString("ko-KR")}원
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
