// 카테고리 정보 불러오기
fetch('http://kdt-sw-5-team01.elicecoding.com/api/categories')
    .then((response) => response.json())
    .then((data) => {
        categorysListArr = data;
        categoryMade();
    });

let categorysListArr = [];

const categoryList = document.querySelector('.category_list');

// 카테고리 동적 추가 함수
function categoryMade() {
    for (let i = 0; i < categorysListArr.length; i++) {
        categorysListArr[
            i
        ].imgUrl = `../assets/img/${categorysListArr[i].title}.png`;
        document.getElementById('category_list').innerHTML += `
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

    // 제품의 총 개수 구하기
    const totalProducts = document.querySelector('.total_products');

    function totalProduts() {
        return (totalProducts.innerText = `총 ${
            document.getElementsByClassName('li_products').length
        }개의 상품`);
    }
    totalProduts();

    // 카테고리별 제품의 총 개수 구하기
    function totalCategorys(len) {
        return (totalProducts.innerText = `총 ${len}개의 상품`);
    }

    // 동적으로 생성한 카테고리 버튼
    const bedBtn = document.getElementById('bed');
    const sofaBtn = document.getElementById('sofa');
    const tableBtn = document.getElementById('table');
    const closetBtn = document.getElementById('closet');
    const drawerBtn = document.getElementById('drawer');
    const deskBtn = document.getElementById('desk');

    // 침대 카테고리 상품 분류
    bedBtn.addEventListener('click', (e) => {
        const bedListArr = productsListArr.filter(
            (data) => data.categoryId.title === 'bed',
        );
        const bedCountLen = bedListArr.length;

        e.preventDefault();
        productReset();
        productMade(bedListArr);
        totalCategorys(bedCountLen);
    });

    // 소파 카테고리 상품 분류
    sofaBtn.addEventListener('click', (e) => {
        const sofaListArr = productsListArr.filter(
            (data) => data.categoryId.title === 'sofa',
        );
        const sofaCountLen = sofaListArr.length;

        e.preventDefault();
        productReset();
        productMade(sofaListArr);
        totalCategorys(sofaCountLen);
    });

    // 식탁 카테고리 상품 분류
    tableBtn.addEventListener('click', (e) => {
        const tableListArr = productsListArr.filter(
            (data) => data.categoryId.title === 'table',
        );
        const tableCountLen = tableListArr.length;

        e.preventDefault();
        productReset();
        productMade(tableListArr);
        totalCategorys(tableCountLen);
    });

    // 옷장 카테고리 상품 분류
    closetBtn.addEventListener('click', (e) => {
        const closetListArr = productsListArr.filter(
            (data) => data.categoryId.title === 'closet',
        );
        const closetCountLen = closetListArr.length;

        e.preventDefault();
        productReset();
        productMade(closetListArr);
        totalCategorys(closetCountLen);
    });

    // 협탁 카테고리 상품 분류
    drawerBtn.addEventListener('click', (e) => {
        const drawerListArr = productsListArr.filter(
            (data) => data.categoryId.title === 'drawer',
        );
        const drawerCountLen = drawerListArr.length;

        e.preventDefault();
        productReset();
        productMade(drawerListArr);
        totalCategorys(drawerCountLen);
    });

    // 책상 카테고리 상품 분류
    deskBtn.addEventListener('click', (e) => {
        const deskListArr = productsListArr.filter(
            (data) => data.categoryId.title === 'desk',
        );
        const deskCountLen = deskListArr.length;
        e.preventDefault();
        productReset();
        productMade(deskListArr);
        totalCategorys(deskCountLen);
    });
}
