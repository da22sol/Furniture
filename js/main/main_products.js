// 상품의 id값 기반의 상품 정보 받아오기
fetch(`http://kdt-sw-5-team01.elicecoding.com/api/products`)
    .then((response) => response.json())
    .then((data) => {
        bestProductsListArr = data;
        bestProductsMade();
        randomProducts();
    });
let bestProductsListArr = [];
function randomProducts() {
    let randomProductsArr = [];
    randomProductsArr.push();
    let randomProduct = Math.trunc(Math.random() * bestProductsListArr.length);
}

const bestProductsList = document.querySelector('.list_best_products');

function bestProductsMade() {
    for (let i = 0; i < 8; i++) {
        bestProductsList.innerHTML += `
        <li class="li_products">
            <a id="${bestProductsListArr[i]._id}" href="/html/detail.html?${bestProductsListArr[i]._id}">
                <span class="img_best_product">
                    <img src="${bestProductsListArr[i].productImageKey}" class="img_best_product"></img>
                </span>
                <strong>
                    ${bestProductsListArr[i].categoryId.title}
                </strong>
                <p class="text_product_name">
                    ${bestProductsListArr[i].productName}
                </p>
                <p>
                    ${bestProductsListArr[i].price}
                </p>
            </a>
        </li>
        `;
    }
}
