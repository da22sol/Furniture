// 현재 로그인 되어 있는 계정 토큰 불러오기
const ISADMIN = localStorage.getItem('isAdmin');

window.addEventListener('load', () => {
    if (ISADMIN !== 'true') {
        alert('🚫관리자만 접근가능합니다');
        location.href = '/index.html';
    }
});

const goodsData = document.querySelector('.table');
// 현재 로그인 되어 있는 계정 토큰 불러오기
const USERTOKEN = localStorage.getItem('userToken');

// 상품 추가 모달창
const plusGoodsModalXbtn =
    document.getElementsByClassName('plus_product_btn')[0];
const plusGoodsModalSbtn =
    document.getElementsByClassName('submit_plus_goods')[0];
const plusGoodsModal = document.getElementsByClassName('goods_modal')[0];
const plusGoodsModalObtn = document.getElementsByClassName(
    'manage_goods_add_btn',
)[0];

// 상품 수정 모달창
const editGoodsModalXbtn =
    document.getElementsByClassName('edit_product_btn')[0];
const editGoodsModalSbtn =
    document.getElementsByClassName('submit_edit_goods')[0];
const editGoodsModal = document.getElementsByClassName(
    'manage_edit_goods_modal',
)[0];

editGoodsModalXbtn.addEventListener('click', () => {
    editGoodsModal.style.display = 'none';
});

plusGoodsModalXbtn.addEventListener('click', () => {
    plusGoodsModal.style.display = 'none';
});

plusGoodsModalObtn.addEventListener('click', () => {
    plusGoodsModal.style.display = 'flex';
});

plusPricefetchData();

async function plusPricefetchData() {
    const res = await fetch(
        'http://kdt-sw-5-team01.elicecoding.com/api/products',
    );
    let data = await res.json();

    // 관리자 상품 생성
    function manageGoodsMade() {
        for (let i = 0; i < data.length; i++) {
            goodsData.innerHTML += `
            <tr class="goods_table">
                <td class="goods_cate">${data[i].categoryId.title}</td>
                <td class="goods_name">${data[i].productName}</td>
                <td class="goods_pric">${data[i].price.toLocaleString(
                    'ko-KR',
                )}</td>
                <td class="goods_date">${data[i].createdAt.split('T')[0]}</td>
                <td class="goods_scrip">${data[i].shortDescription}</td>
                <td class="goods_modi"><button class="goods_modi_btn">수정</button></td>
                <td class="goods_del"><button class="goods_del_btn">삭제</button></td>
            </tr>
        `;
        }
    }

    // 상품 초기화
    function manageGoodsReset() {
        goodsData.innerHTML = '';
    }

    manageGoodsMade();

    // 값 가져오기 - 상품 등록 모달
    const plusCategotyInput = document.getElementById('plus_category');
    const plusGoodsInput = document.getElementById('plus_goods');
    const plusPriceInput = document.getElementById('plus_price');
    const plusDescInput = document.getElementById('plus_des');
    const plusKeywordInput = document.getElementById('plus_keyword');

    // 값 가져오기 - 상품 수정 모달
    const editCategotyInput = document.getElementById('edit_category');
    const editGoodsInput = document.getElementById('edit_goods');
    const editPriceInput = document.getElementById('edit_price');
    const editDescInput = document.getElementById('edit_des');
    const editKeywordInput = document.getElementById('edit_keyword');
    let editPic = '';

    let plusCategotyInputValue = '';

    // 이미지 정보
    const imgForm = document.querySelector('.goods_modal form');
    const submitImgBtn = document.getElementById('submit_pic');
    submitImgBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const formData = new FormData(imgForm);

        fetch('http://kdt-sw-5-team01.elicecoding.com/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((picData) => {
                const picUrl = `http://kdt-sw-5-team01.elicecoding.com${picData.imageUrl}`;

                // 상품 추가
                plusGoodsModalSbtn.addEventListener('click', () => {
                    if (plusCategotyInput.value == 'bed') {
                        plusCategotyInputValue = '64ae57f7ad2344d26934ba33';
                    } else if (plusCategotyInput.value == 'desk') {
                        plusCategotyInputValue = '64ae53a10610d58017eac153';
                    } else if (plusCategotyInput.value == 'table') {
                        plusCategotyInputValue = '64ae53a10610d58017eac154';
                    } else if (plusCategotyInput.value == 'closet') {
                        plusCategotyInputValue = '64aec3715c0eee670bdcc5e1';
                    } else if (plusCategotyInput.value == 'sofa') {
                        plusCategotyInputValue = '64ae57f7ad2344d26934ba34';
                    } else if (plusCategotyInput.value == 'drawer') {
                        plusCategotyInputValue = '64aec3db5c0eee670bdcc5e3';
                    }

                    // 객체
                    const plusGoodsData = {
                        productName: plusGoodsInput.value,
                        categoryId: plusCategotyInputValue,
                        shortDescription: plusDescInput.value,
                        productImageKey: picUrl,
                        price: plusPriceInput.value,
                        searchKeywords: plusKeywordInput.value,
                    };

                    const dataJson = JSON.stringify(plusGoodsData);
                    fetch(
                        'http://kdt-sw-5-team01.elicecoding.com/api/products',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${USERTOKEN}`,
                            },
                            body: dataJson,
                        },
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            alert('등록 완료!');
                            manageGoodsReset();
                            manageGoodsMade();
                            window.location.reload();
                        });
                });
            });
    });

    // 상품 수정
    const modiBtn = document.querySelectorAll('.goods_modi_btn');
    const imgEditForm = document.querySelector('.edit_goods_modal form');
    const submitEditImgBtn = document.getElementById('submit_edit_pic');

    modiBtn.forEach((button, i) => {
        button.addEventListener('click', () => {
            editGoodsModal.style.display = 'flex';

            if (plusCategotyInput.value == '64ae57f7ad2344d26934ba33') {
                plusCategotyInputValue = 'bed';
            } else if (plusCategotyInput.value == '64ae53a10610d58017eac153') {
                plusCategotyInputValue = 'desk';
            } else if (plusCategotyInput.value == '64ae53a10610d58017eac154') {
                plusCategotyInputValue = 'table';
            } else if (plusCategotyInput.value == '64aec3715c0eee670bdcc5e1') {
                plusCategotyInputValue = 'closet';
            } else if (plusCategotyInput.value == '64ae57f7ad2344d26934ba34') {
                plusCategotyInputValue = 'sofa';
            } else if (plusCategotyInput.value == '64aec3db5c0eee670bdcc5e3') {
                plusCategotyInputValue = 'drawer';
            }

            const productNames = data[i].productName;
            const categoryId = data[i].categoryId.title;
            const shortDescription = data[i].shortDescription;
            const productSearch = data[i].searchKeywords;
            const price = data[i].price;

            editGoodsInput.value = productNames;
            editCategotyInput.value = categoryId;
            editPriceInput.value = price;
            editDescInput.value = shortDescription;
            editKeywordInput.value = productSearch;

            submitEditImgBtn.addEventListener('click', (e) => {
                e.preventDefault();

                const formData = new FormData(imgEditForm);

                fetch('http://kdt-sw-5-team01.elicecoding.com/api/upload', {
                    method: 'POST',
                    body: formData,
                })
                    .then((res) => res.json())
                    .then((picData) => {
                        const picUrl = `http://kdt-sw-5-team01.elicecoding.com${picData.imageUrl}`;

                        editGoodsModalSbtn.addEventListener('click', () => {
                            let finGoodsInput = editGoodsInput.value;
                            let finCategotyInput = editCategotyInput.value;
                            let finPriceInput = editPriceInput.value;
                            let finDescInput = editDescInput.value;
                            let finKeywordInput = editKeywordInput.value;

                            if (editCategotyInput.value == 'bed') {
                                finCategotyInput = '64ae57f7ad2344d26934ba33';
                            } else if (editCategotyInput.value == 'desk') {
                                finCategotyInput = '64ae53a10610d58017eac153';
                            } else if (editCategotyInput.value == 'table') {
                                finCategotyInput = '64ae53a10610d58017eac154';
                            } else if (editCategotyInput.value == 'closet') {
                                finCategotyInput = '64aec3715c0eee670bdcc5e1';
                            } else if (editCategotyInput.value == 'sofa') {
                                finCategotyInput = '64ae57f7ad2344d26934ba34';
                            } else if (editCategotyInput.value == 'drawer') {
                                finCategotyInput = '64aec3db5c0eee670bdcc5e3';
                            }

                            const productsDataJson = JSON.stringify({
                                productName: finGoodsInput,
                                categoryId: finCategotyInput,
                                price: finPriceInput,
                                shortDescription: finDescInput,
                                productImageKey: picUrl,
                                searchKeywords: finKeywordInput,
                            });

                            fetch(
                                `http://kdt-sw-5-team01.elicecoding.com/api/products/${data[i]._id}`,
                                {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGFjZjViMzExZTI3Y2JhMWMwNDk3NTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODkzMTE2NDF9.I3PyKm6AshCzE9_TclN4sP453MexXrPjci3BGgZh8gk`,
                                    },
                                    body: productsDataJson,
                                },
                            )
                                .then((res) => res.json())
                                .then((data) => {
                                    manageGoodsReset();
                                    manageGoodsMade();
                                    window.location.reload();
                                });
                        });
                    });
            });
        });
    });

    // 상품 삭제
    const delBtn = document.querySelectorAll('.goods_del_btn');
    delBtn.forEach((button, i) => {
        button.addEventListener('click', () => {
            const confirmDelete =
                window.confirm('해당 주문건을 삭제하시겠습니까?');
            if (confirmDelete) {
                alert(`${data[i].productName}이 삭제되었습니다.`);
                fetch(
                    `http://kdt-sw-5-team01.elicecoding.com/api/products/${data[i]._id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGFjZjViMzExZTI3Y2JhMWMwNDk3NTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODkzMTE2NDF9.I3PyKm6AshCzE9_TclN4sP453MexXrPjci3BGgZh8gk`,
                        },
                    },
                )
                    .then((res) => res.json())
                    .then((data) => {
                        manageGoodsReset();
                        manageGoodsMade();
                        window.location.reload();
                    });
            }
        });
    });
}
