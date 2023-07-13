fetch('http://kdt-sw-5-team01.elicecoding.com/api/categories')
    .then((response) => response.json())
    .then((data) => {
        manageCategorysListArr = data;
        // 기본 카테고리 함수 실행
        console.log(data);
        plusManageCategoryMade();
    });

let manageCategorysListArr = [];

const addCatgoryInput = document.getElementById('category');
const addCatgoryBtn = document.querySelector('.add_category button');
const manageCategoryList = document.querySelector('ul.manage_category');

addCatgoryBtn.addEventListener('click', () => {
    const categoryValue = addCatgoryInput.value;
    plusManageCategoryMade(categoryValue);
});

// 기본 카테고리 함수
function defaultManageCategoryMade() {
    for (let i = 0; i < manageCategorysListArr.length; i++) {
        switch (manageCategorysListArr[i].title) {
            case 'bed':
                manageCategorysListArr[i].koreanTitle = '침대';
                break;
            case 'desk':
                manageCategorysListArr[i].koreanTitle = '책상';
                break;
            case 'table':
                manageCategorysListArr[i].koreanTitle = '식탁';
                break;
            case 'sofa':
                manageCategorysListArr[i].koreanTitle = '소파';
                break;
            case 'closet':
                manageCategorysListArr[i].koreanTitle = '옷장';
                break;
            case 'drawer':
                manageCategorysListArr[i].koreanTitle = '협탁';
                break;
        }
        manageCategoryList.innerHTML += `
        <li>
            <span>${i + 1}</span>
            <p>${manageCategorysListArr[i].koreanTitle}</p>
            <div class="btn_edit">
                <button class="btn_edit_retouch">수정</button>
                <button class="btn_edit_delete">삭제</button>
            </div>
        </li>
        `;
    }
}

// 카테고리 추가 함수
function plusManageCategoryMade(data) {
    manageCategorysListArr.push({
        id: manageCategorysListArr.length + 1,
        categoryName: data,
    });
    categoryReset();
    defaultManageCategoryMade();
}

// 카테고리 리셋 함수
function categoryReset() {
    manageCategoryList.innerHTML = '';
}

const retouchBtn = document.querySelectorAll('.btn_edit_retouch');
const deleteBtn = document.querySelectorAll('.btn_edit_delete');

// 카테고리 수정
for (let i = 0; i < retouchBtn.length; i++) {
    retouchBtn[i].addEventListener('click', (e) => {
        const retouchCategoryValue =
            e.target.parentElement.parentElement.querySelector('p').innerText;
        console.log(retouchCategoryValue);
        let changeCategoryVal = prompt(
            '변경하실 카테고리명을 입력해주세요',
            '카테고리명',
        );
        manageCategorysListArr[i].categoryName = changeCategoryVal;
        alert(`${changeCategoryVal}으로 수정되었습니다`);
        categoryReset();
        defaultManageCategoryMade();
    });
}

// 카테고리 삭제
for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', (e) => {
        const categoryId =
            e.target.parentElement.parentElement.querySelector(
                'span',
            ).innerText;
        console.log(categoryId);
        if (manageCategorysListArr[categoryId - 1]) {
            manageCategorysListArr.splice(manageCategorysListArr[i].id, 1);
        }
        console.log(manageCategorysListArr);
        categoryReset();
        defaultManageCategoryMade();
    });
}
