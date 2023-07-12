const orderTrackingListArr = [
    {
        productName: 'POÄNG 포엥 1개',
        PaymentAmount: 99000,
        PaymentDay: '2023-07-12',
        PaymentTime: '17:40',
        requestMessage: '도착전 전화해주세요.',
        orderNumber: '2323elice0710647',
        orderState: '배송준비중',
    },
    {
        productName: 'POÄNG 포엥 1개',
        PaymentAmount: 99000,
        PaymentDay: '2023-07-12',
        PaymentTime: '17:40',
        requestMessage: '도착전 전화해주세요.',
        orderNumber: '2323elice0710648',
        orderState: '배송준비중',
    },
    {
        productName: 'POÄNG 포엥 1개',
        PaymentAmount: 99000,
        PaymentDay: '2023-07-12',
        PaymentTime: '17:40',
        requestMessage: '도착전 전화해주세요.',
        orderNumber: '2323elice07106469',
        orderState: '배송준비중',
    },
];

//주문 추가
const orderTrackingList = document.querySelector('.order_tracking_list');
const orderList = document.querySelector('.order_list');

// 주문 동적 추가 함수
function orderMade() {
    for (let i = 0; i < orderTrackingListArr.length; i++) {
        if (orderTrackingListArr.length === 0) {
            orderTrackingList.innerHTML += '주문정보가 없습니다';
        } else {
            orderTrackingList.innerHTML += `
        <div class="order_list" id=${orderTrackingListArr[i].orderNumber}>
            <div class="img_thumb">
                <img src="../assets/img/thumbnail2.png" alt="thumbnail">
            </div>
            <div class="order_name">
                <ul class="list_name">
                    <li class="product_name">
                        <a href="/">${orderTrackingListArr[i].productName}</a>
                    </li>
                    <li>결제금액 : ${orderTrackingListArr[i].PaymentAmount} | ${orderTrackingListArr[i].PaymentDay} | ${orderTrackingListArr[i].PaymentTime}</li>
                    <li>요청 사항 : ${orderTrackingListArr[i].requestMessage}</li>
                    <li>주문 번호 : ${orderTrackingListArr[i].orderNumber}</li>
                </ul>
            </div>
            <div class="order_btn">
                <ul>
                    <li>${orderTrackingListArr[i].orderState}</li>
                    <li class="order_del">결제취소</li>
                </ul>
            </div>
        </div>
        `;
        }
    }
}
// 주문 동적 추가 함수 실행
orderMade();

function orderReset() {
    orderTrackingList.innerHTML = '';
}

// 주문 취소
const orderDeleteBtn = document.querySelector('.order_del');

orderDeleteBtn.addEventListener('click', (e) => {
    // // order delete 통신
    // fetch('http://백엔드 주소/order', {
    //     method: 'DELETE',
    //     headers: {
    //         Authorization: localStorage.getItem('access_token'),
    //     },
    //     body: JSON.stringify({
    //         //삭제하고싶은 데이터의 회원 id
    //         order_id: order_id,
    //     }),
    // })
    //     .then((response) => {
    //         if (response.ok === true) {
    //             orderTrackingList -= orderList;
    //             return orderTrackingList;
    //         }
    //     })
    //     .catch((error) => console.log(error));
    console.log(orderDeleteBtn);
    const nowOrderListId =
        e.target.parentElement.parentElement.parentElement.id;
    console.log(nowOrderListId);

    orderTrackingListArr.forEach((item, index) => {
        // console.log(item.orderNumber === nowOrderList);
        if (item.orderNumber === nowOrderListId) {
            orderTrackingListArr.splice(index, 1);
        }
    });

    // 주문 동적 추가 함수 실행
    orderReset();
    orderMade();
});
