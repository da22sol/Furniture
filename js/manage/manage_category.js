fetch('http://kdt-sw-5-team01.elicecoding.com/api/categories')
    .then((response) => response.json())
    .then((data) => {
        manageCategorysListArr = data;
        console.log(data);
        plusManageCategoryMade();
    });

let manageCategorysListArr = [];

const addCategoryInput = document.getElementById('category');
const addCategoryBtn = document.querySelector('.add_category button');
const manageCategoryList = document.querySelector('ul.manage_category');

addCategoryBtn.addEventListener('click', () => {
    const categoryValue = addCategoryInput.value;
    console.log(categoryValue);

    const categoryDataJson = JSON.stringify({ title: categoryValue });
    console.log(categoryDataJson);
    fetch('http://kdt-sw-5-team01.elicecoding.com/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: categoryDataJson,
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });

    plusManageCategoryMade();
});

// 기본 카테고리 함수
function plusManageCategoryMade() {
    for (let i = 0; i < manageCategorysListArr.length; i++) {
        manageCategoryList.innerHTML += `
        <li>
            <span>${i + 1}</span>
            <p>${manageCategorysListArr[i].title}</p>
            <div class="btn_edit">
                <button class="btn_edit_retouch">수정</button>
                <button class="btn_edit_delete">삭제</button>
            </div>
        </li>
        `;
    }

    const retouchBtn = document.querySelectorAll('.btn_edit_retouch');
    const deleteBtn = document.querySelectorAll('.btn_edit_delete');

    // 카테고리 수정
    for (let i = 0; i < retouchBtn.length; i++) {
        retouchBtn[i].addEventListener('click', (e) => {
            let retouchCategoryValue =
                e.target.parentElement.parentElement.querySelector(
                    'p',
                ).innerText;
            console.log(retouchCategoryValue);
            let changeCategoryVal = prompt(
                '변경하실 카테고리명을 입력해주세요',
                '카테고리명',
            );
            manageCategorysListArr[i].categoryName = changeCategoryVal;
            alert(`${changeCategoryVal}으로 수정되었습니다`);
            console.log(changeCategoryVal);

            //fetch patch 통신
            const categoryDataJson = JSON.stringify({
                title: changeCategoryVal,
            });
            console.log(categoryDataJson);
            fetch(
                'http://kdt-sw-5-team01.elicecoding.com/api/categories/:categoryId',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: categoryDataJson,
                },
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    retouchCategoryValue = data;
                });

            categoryReset();
            plusManageCategoryMade();
        });
    }

    // 카테고리 삭제
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', (e) => {
            let deleteCategoryValue =
                e.target.parentElement.parentElement.querySelector(
                    'p',
                ).innerText;
            console.log(deleteCategoryValue);

            //fetch delete 통신
            const categoryDataJson = JSON.stringify({
                title: deleteCategoryValue,
            });
            console.log(categoryDataJson);
            fetch(
                'http://kdt-sw-5-team01.elicecoding.com/api/categories/:categoryId',
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: categoryDataJson,
                },
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    retouchCategoryValue = data;
                });

            categoryReset();
            plusManageCategoryMade();
        });
    }
}

// 카테고리 리셋 함수
function categoryReset() {
    manageCategoryList.innerHTML = '';
}
