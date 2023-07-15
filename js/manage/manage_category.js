fetch('http://kdt-sw-5-team01.elicecoding.com/api/categories')
    .then((response) => response.json())
    .then((data) => {
        manageCategorysListArr = data;
        plusManageCategoryMade();
    });

let manageCategorysListArr = [];

const addCategoryInput = document.getElementById('category');
const addCategoryBtn = document.querySelector('.add_category button');
const manageCategoryList = document.querySelector('ul.manage_category');

addCategoryBtn.addEventListener('click', () => {
    const categoryValue = addCategoryInput.value;

    const categoryDataJson = JSON.stringify({ title: categoryValue });

    fetch(`http://kdt-sw-5-team01.elicecoding.com/api/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGFjZjViMzExZTI3Y2JhMWMwNDk3NTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODkzMTE2NDF9.I3PyKm6AshCzE9_TclN4sP453MexXrPjci3BGgZh8gk`,
        },
        body: categoryDataJson,
    })
        .then((res) => res.json())
        .then((data) => {
            categoryReset();
            plusManageCategoryMade();
            window.location.reload();
        });
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

            let changeCategoryVal = prompt(
                '변경하실 카테고리명을 입력해주세요',
                '카테고리명',
            );
            manageCategorysListArr[i].categoryName = changeCategoryVal;
            alert(`${changeCategoryVal}으로 수정되었습니다`);

            //fetch patch 통신
            const categoryDataJson = JSON.stringify({
                title: changeCategoryVal,
            });
            fetch(
                `http://kdt-sw-5-team01.elicecoding.com/api/categories/${manageCategorysListArr[i]._id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGFjZjViMzExZTI3Y2JhMWMwNDk3NTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODkzMTE2NDF9.I3PyKm6AshCzE9_TclN4sP453MexXrPjci3BGgZh8gk`,
                    },
                    body: categoryDataJson,
                },
            )
                .then((res) => res.json())
                .then((data) => {
                    retouchCategoryValue = data;
                    categoryReset();
                    plusManageCategoryMade();
                    window.location.reload();
                });
        });
    }

    // 카테고리 삭제
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', (e) => {
            let deleteCategoryValue =
                e.target.parentElement.parentElement.querySelector(
                    'p',
                ).innerText;
            //fetch delete 통신
            const categoryDataJson = JSON.stringify({
                title: deleteCategoryValue,
            });

            fetch(
                `http://kdt-sw-5-team01.elicecoding.com/api/categories/${manageCategorysListArr[i]._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGFjZjViMzExZTI3Y2JhMWMwNDk3NTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODkzMTE2NDF9.I3PyKm6AshCzE9_TclN4sP453MexXrPjci3BGgZh8gk`,
                    },
                    body: categoryDataJson,
                },
            )
                .then((res) => res.json())
                .then((data) => {
                    retouchCategoryValue = data;
                    categoryReset();
                    plusManageCategoryMade();
                    window.location.reload();
                });
        });
    }
}

// 카테고리 리셋 함수
function categoryReset() {
    manageCategoryList.innerHTML = '';
}
