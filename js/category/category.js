// 카테고리 정보 불러오기
fetch('http://kdt-sw-5-team01.elicecoding.com/api/categories')
    .then((response) => response.json())
    .then((data) => {
        categorysListArr = data;
        categoryMade();
    });

// 카테고리 목록 배열
let categorysListArr = [];

// 카테고리 담을 리스트
const categoryList = document.querySelector('#category_list');

const categoryTitle = document.querySelector('.sub_category .inner h2');

// 카테고리 동적 추가
function categoryMade() {
    for (let i = 0; i < categorysListArr.length; i++) {
        categorysListArr[
            i
        ].imgUrl = `../assets/img/${categorysListArr[i].title}.png`;
        categoryList.innerHTML += `
        <li class="category_list" id="${categorysListArr[i].title}">
            <a href="./category.html" class="list_category">
                <span class="img_category">
                    <img src="${categorysListArr[i].imgUrl}">
                </span>
                <p>${categorysListArr[i].title}</p>
            </a>
        </li>
        `;
    }

    // 분류된 카테고리 상품 구분
    const categoryListItems = document.querySelectorAll('.category_list');

    categoryListItems.forEach((item) =>
        item.addEventListener('click', (event) => {
            event.preventDefault();

            const goodsListArr = productsListArr.filter(
                (data) => data.categoryId.title === event.currentTarget.id,
            );

            productReset();
            categoryTitle.innerHTML = item.id;
            productMade(goodsListArr);

            // 분류된 카테고리 상품 중 필터링 기능
            listFilterNew.addEventListener('click', () => {
                filterSelectesd.innerHTML = '신상품순';
                listFilterNewDateSort(goodsListArr);
            });

            listFilterHighPrice.addEventListener('click', () => {
                filterSelectesd.innerHTML = '높은가격순';
                listFilterHighPriceSort(goodsListArr);
            });

            listFilterLowPrice.addEventListener('click', () => {
                filterSelectesd.innerHTML = '낮은가격순';
                listFilterLowPriceSort(goodsListArr);
            });

            // 필터링 default 값
            filterSelectesd.innerHTML = '신상품순';
        }),
    );
}
