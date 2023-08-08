9; // 상품의 id값 기반의 상품 정보 받아오기
fetch(`http://kdt-sw-5-team01.elicecoding.com/api/products`)
    .then((response) => response.json())
    .then((data) => {
        bestProductsListArr = data;

        randomProductsMade();

        const randomBestProductsListArr = bestProductsListArr
            .map((item, index) => {
                if (randomProductsArr.includes(index)) {
                    return item;
                }
                return -1;
            })
            .filter((item) => item !== -1);

        bestProductsMade(randomBestProductsListArr);
    });

let bestProductsListArr = [];
let randomProductsArr = [];

function randomProductsMade() {
    while (randomProductsArr.length < 9) {
        let randomProduct = Math.trunc(
            Math.random() * bestProductsListArr.length,
        );
        randomProductsArr.push(randomProduct);
        let setRandomProductsArr = new Set(randomProductsArr);
        randomProductsArr = [...setRandomProductsArr];
    }
    return randomProductsArr;
}

const bestProductsList = document.querySelector('.list_best_products');

function bestProductsMade(data) {
    for (let i = 0; i < data.length; i++) {
        bestProductsList.innerHTML += `
        <li class="li_products">
            <a id="${data[i]._id}" href="/html/detail.html?${data[i]._id}">
                <span class="img_best_product">
                    <img src="${
                        data[i].productImageKey
                    }" class="img_best_product"></img>
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
}
