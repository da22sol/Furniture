const tableData = document.querySelector('.table');
console.log(tableData);

fetchData();

async function fetchData() {
  const res = await fetch('../js/sub/manage.json');
  const data = await res.json();
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const orderState = data[i].order_state;
    tableData.innerHTML += `
      <tr class="order_table">
        <td class="order_date">${data[i].order_date}</td>
        <td class="order_time">${data[i].order_time}</td>
        <td class="order_number">${data[i].order_number}</td>
        <td class="order_state">
          <select name="order_state" id="${data[i].order_state}">
            <option class="or_sta" ${orderState === '배송중' ? 'selected' : ''}>배송중</option> 
              <option class="or_sta" ${orderState === '배송취소' ? 'selected' : ''}>배송취소</option>
            <option class="or_sta" ${orderState === '상품준비중' ? 'selected' : ''}>상품준비중</option>
          </select>
        </td>
        <td class="order_dele_btn"><button class="del_btn">주문삭제</button></td>
      </tr>
    `;
  }
  const delBtn = document.querySelectorAll('.del_btn');
  delBtn.forEach((button, i) => {
    button.addEventListener('click', () => {
      const confirmDelete = window.confirm("해당 주문건을 삭제하시겠습니까?");
      if (confirmDelete) {
        const orderTable = button.closest('.order_table');
        orderTable.remove();
        // 예시: 주문 삭제 후 알림 메시지 표시
        alert(`${data[i].order_number} 삭제되었습니다.`);
        data = data.filter((item, index) => index !== i); // JSON 데이터에서 해당 객체 제거
      }
    });
  });
}


// const dele_btn = document.querySelector('.del_btn')
// dele_btn.addEventListener('click', () => {
//   const orderList = 

//  })







// api 변경하면 알림창뜸
// const orderState = document.querySelectorAll(".order_state");
// orderState.forEach((select) => {
//   select.addEventListener('change', async () => {
//     const id = select.parentElement.id;
//     const selectState = select.value;
//     await Api.patch("/api/orders", "", {
//       id: id,
//       reson: changedState, // 변경할 상태 값
//     });
//     alert("배송상태가 변경되었습니다"); // 변경되었다는 알림 메시지
//     clickedOrder();
//   });
// });
