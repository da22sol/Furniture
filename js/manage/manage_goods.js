const goodsData = document.querySelector('.table');

fetchData();

async function fetchData() {
    const res = await fetch(
        'http://kdt-sw-5-team01.elicecoding.com/api/products',
    );
    let data = await res.json();
    console.log(data);

    // 관리자 상품 생성
    function manageGoodsMade() {
        for (let i = 0; i < data.length; i++) {
            goodsData.innerHTML += `
            <tr class="goods_table">
                <td class="goods_cate">${data[i].categoryId.title}</td>
                <td class="goods_name">${data[i].productName}</td>
                <td class="goods_pric">${data[i].price}</td>
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

    // 상품 수정
    const modiBtn = document.querySelectorAll('.goods_modi_btn');
    modiBtn.forEach((button, i) => {
        button.addEventListener('click', () => {
            // <!-- 이 아래로 수정 필요 ( 작업후 삭제 필요 )
            // 변수들을 수정버튼누르면 모1` 달창을 열거나,
            //html의 구조를 td > input을 넣어서 현재 해당 값을 넣게 하는 방식으로?
            const productName = data[i].productName;
            const categoryId = data[i].categoryId.title;
            const shortDescription = data[i].shortDescription;
            const productImageKey = data[i].productImageKey;
            const price = data[i].price;

            const productsDataJson = JSON.stringify({
                productName: productName,
                categoryId: categoryId,
                shortDescription: shortDescription,
                productImageKey: productImageKey,
                price: price,
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
                    console.log(data);
                    manageGoodsReset();
                    manageGoodsMade();
                    // window.location.reload();
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
                        console.log(data);
                        manageGoodsReset();
                        manageGoodsMade();
                        window.location.reload();
                    });
            }
        });
    });
}
