const manageCategorysListArr = [
    { categoryName: '침대' },
    { categoryName: '소파' },
    { categoryName: '식탁' },
    { categoryName: '옷장' },
    { categoryName: '협탁' },
    { categoryName: '책상' },
    { categoryName: '책장' },
];

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
        manageCategoryList.innerHTML += `
        <li>
            <span>${i + 1}</span>
            <p>${manageCategorysListArr[i].categoryName}</p>
            <div class="btn_edit">
                <button class="btn_edit_retouch">수정</button>
                <button class="btn_edit_delete">삭제</button>
            </div>
        </li>
        `;
    }
}
// 기본 카테고리 함수 실행
defaultManageCategoryMade();

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
