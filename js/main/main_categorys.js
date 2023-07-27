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
        switch (categorysListArr[i].title) {
            case 'bed':
                categorysListArr[
                    i
                ].imgUrl = `../assets/img/${categorysListArr[i].title}.png`;
                break;
            case 'desk':
                categorysListArr[
                    i
                ].imgUrl = `../assets/img/${categorysListArr[i].title}.png`;
                break;
            case 'table':
                categorysListArr[
                    i
                ].imgUrl = `../assets/img/${categorysListArr[i].title}.png`;
                break;
            case 'sofa':
                categorysListArr[
                    i
                ].imgUrl = `../assets/img/${categorysListArr[i].title}.png`;
                break;
            case 'closet':
                categorysListArr[
                    i
                ].imgUrl = `../assets/img/${categorysListArr[i].title}.png`;
                break;
            case 'drawer':
                categorysListArr[
                    i
                ].imgUrl = `../assets/img/${categorysListArr[i].title}.png`;
                break;
        }

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
}
