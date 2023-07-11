// 임의 카테고리 객체 배열
const categorysListArr = [
    {
        id: 'bed',
        name: '침대',
        imgUrl: '../assets/img/bed.png',
    },
    {
        id: 'sofa',
        name: '소파',
        imgUrl: '../assets/img/sofa.png',
    },
    {
        id: 'table',
        name: '식탁',
        imgUrl: '../assets/img/table.png',
    },
    {
        id: 'closet',
        name: '옷장',
        imgUrl: '../assets/img/closet.png',
    },
    {
        id: 'drawer',
        name: '협탁',
        imgUrl: '../assets/img/drawer.png',
    },
    {
        id: 'desk',
        name: '책상',
        imgUrl: '../assets/img/desk.png',
    },
    {
        id: 'bookshelf',
        name: '책장',
        imgUrl: '../assets/img/bookshelf.png',
    },
];

const categoryList = document.querySelector('.category_list');

// 카테고리 동적 추가 함수
function categoryMade() {
    for (let i = 0; i < categorysListArr.length; i++) {
        document.getElementById('category_list').innerHTML += `
        <li class="category_list" id="${categorysListArr[i].id}">
            <a href="./category.html" class="list_category">
                <span class="img_category">
                    <img src="${categorysListArr[i].imgUrl}" alt="${categorysListArr[i].id}">
                </span>
                <p>${categorysListArr[i].name}</p>
            </a>
        </li>
        `;
    }
}

// 카테고리 동적 추가 함수 실행
categoryMade();

const bedBtn = document.getElementById('bed');
const sofaBtn = document.getElementById('sofa');
const tableBtn = document.getElementById('table');
const closetBtn = document.getElementById('closet');
const drawerBtn = document.getElementById('drawer');
const deskBtn = document.getElementById('desk');
const bookshelfBtn = document.getElementById('bookshelf');

// 침대 카테고리 상품 분류
bedBtn.addEventListener('click', (e) => {
    const bedListArr = productsListArr.filter((data) => data.id === 'bed');
    const bedCountLen = bedListArr.length;

    e.preventDefault();
    productReset();
    productMade(bedListArr);
    totalCategorys(bedCountLen);
});

// 소파 카테고리 상품 분류
sofaBtn.addEventListener('click', (e) => {
    const sofaListArr = productsListArr.filter((data) => data.id === 'sofa');
    const sofaCountLen = sofaListArr.length;

    e.preventDefault();
    productReset();
    productMade(sofaListArr);
    totalCategorys(sofaCountLen);
});

// 식탁 카테고리 상품 분류
tableBtn.addEventListener('click', (e) => {
    const tableListArr = productsListArr.filter((data) => data.id === 'table');
    const tableCountLen = tableListArr.length;

    e.preventDefault();
    productReset();
    productMade(tableListArr);
    totalCategorys(tableCountLen);
});

// 옷장 카테고리 상품 분류
closetBtn.addEventListener('click', (e) => {
    const closetListArr = productsListArr.filter(
        (data) => data.id === 'closet',
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
        (data) => data.id === 'drawer',
    );
    const drawerCountLen = drawerListArr.length;

    e.preventDefault();
    productReset();
    productMade(drawerListArr);
    totalCategorys(drawerCountLen);
});

// 책상 카테고리 상품 분류
deskBtn.addEventListener('click', (e) => {
    const deskListArr = productsListArr.filter((data) => data.id === 'desk');
    const deskCountLen = deskListArr.length;

    e.preventDefault();
    productReset();
    productMade(deskListArr);
    totalCategorys(deskCountLen);
});

// 책장 카테고리 상품 분류
bookshelfBtn.addEventListener('click', (e) => {
    const bookshelfListArr = productsListArr.filter(
        (data) => data.id === 'bookshelf',
    );
    const bookshelfCountLen = bookshelfListArr.length;

    e.preventDefault();
    productReset();
    productMade(bookshelfListArr);
    totalCategorys(bookshelfCountLen);
});
