const productsList = [
    {
        brand: "brand 1",
        name: "product 1",
        price: 1000,
    },
    {
        brand: "brand 2",
        name: "product 2",
        price: 5000,
    },
    {
        brand: "brand 3",
        name: "product 3",
        price: 8000,
    },
    {
        brand: "brand 4",
        name: "product 4",
        price: 20000,
    },
    {
        brand: "brand 5",
        name: "product 5",
        price: 5000,
    },
    {
        brand: "brand 6",
        name: "product 6",
        price: 70000,
    },
];

for (let i = 0; i < productsList.length; i++) {
    document.getElementById("list_category_sale").innerHTML += `
    <li class="li_products">
        <a href="/">
            <span class="img_sale_product">
                <!-- 이미지 넣기 -->
            </span>
            <strong>
                ${productsList[i].brand}
            </strong>
            <p class="text_product_name">
                ${productsList[i].name}
            </p>
            <p>
                ${productsList[i].price}
            </p>
        </a>
    </li>
    `;
}

const TOTALCOUNT = document.getElementsByClassName("li_products");
const TOTALPRODUCTS = document.querySelector(".total_products");
const totalCount = TOTALCOUNT.length;

TOTALPRODUCTS.innerText = `총 ${totalCount}개의 상품`;

const FILTERSELECTED = document.querySelector(".filter_drop");
const FILTERLIST = document.querySelector(".list_filter");

FILTERSELECTED.addEventListener("click", () => {
    FILTERLIST.classList.toggle("display");
});

export default {
    TOTALCOUNT,
    totalCount,
    TOTALPRODUCTS,
    FILTERSELECTED,
    FILTERLIST,
};
