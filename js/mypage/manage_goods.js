const goodsData = document.querySelector('.table');
console.log(goodsData);

fetchData();

async function fetchData() {
    const res = await fetch('../js/sub/goods.json');
    let data = await res.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        const goodsState = data[i].goods_state;
        const goodsCate = data[i].goods_cate;
        goodsData.innerHTML += `
      <tr class="goods_table">
        <td class="goods_cate">
          <select class="goods_cate" id="${data[i].goods_cate}">
            <option class="gd_cate" ${
                goodsCate === '침대' ? 'selected' : ''
            }>침대</option>
            <option class="gd_cate" ${
                goodsCate === '책상' ? 'selected' : ''
            }>책상</option>
            <option class="gd_cate" ${
                goodsCate === '옷장' ? 'selected' : ''
            }>옷장</option>
            <option class="gd_cate" ${
                goodsCate === '식탁' ? 'selected' : ''
            }>식탁</option>
            <option class="gd_cate" ${
                goodsCate === '협탁' ? 'selected' : ''
            }>협탁</option>
            <option class="gd_cate" ${
                goodsCate === '책장' ? 'selected' : ''
            }>책장</option>
          </select>
        </td>
        <td class="goods_name">${data[i].goods_name}</td>
        <td class="goods_price">${data[i].goods_price}</td>
        <td class="goods_date">${data[i].goods_date}</td>
        <td class="goods_state">
          <select class="goods_state" id="${data[i].goods_state}">
            <option class="gd_sta" ${
                goodsState === '판매중' ? 'selected' : ''
            }>판매중</option>
            <option class="gd_sta" ${
                goodsState === '판매중지' ? 'selected' : ''
            }>판매중지</option>
          </select>
        </td>
        <td class="goods_scrip">${data[i].goods_scrip}</td>
        <td class="goods_modi"><button class="goods_modi_btn">수정하기</button></td>
        <td class="goods_del"><button class="goods_del_btn">삭제하기</button></td>
      </tr>
    `;
    }

    const delBtn = document.querySelectorAll('.goods_del_btn');
    delBtn.forEach((button, i) => {
        button.addEventListener('click', () => {
            const confirmDelete =
                window.confirm('해당 주문건을 삭제하시겠습니까?');
            if (confirmDelete) {
                const orderTable = button.closest('.goods_table');
                orderTable.remove();
                // 예시: 주문 삭제 후 알림 메시지 표시
                alert(`${data[i].goods_number} 삭제되었습니다.`);
                data = data.filter((item, index) => index !== i); // JSON 데이터에서 해당 객체 제거
            }
        });
    });
}
