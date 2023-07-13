// 회원 정보 레이아웃
const accountDeleteBtn = document.querySelector('.account_delete'); // 회원탈퇴 버튼
const couponBtn = document.querySelector('.coupon'); // 쿠폰 버튼

// 회원탈퇴 => 회원탈퇴 fetch 연결 필요
accountDeleteBtn.addEventListener('click', () => {
    alert('회원을 탈퇴하시겠습니까?');
});

// 쿠폰 => 추후 예정?
couponBtn.addEventListener('click', () => {
    console.log('현재 보유한 쿠폰 : 0');
});

// 회원정보 수정 모달
const userModifyBtn = document.getElementsByClassName('account_modify')[0];
const userZipcodeBtn = document.getElementsByClassName(
    'user_addr_search_zipcode',
)[0];
const userModifyModal = document.getElementById('modal_usercheck');
const modifyCloseBtn = document.getElementsByClassName('btn_close_modal')[0];
const userInfoModifyBtn = document.querySelector(
    '.btn_user_information_modify',
); // 모달 내 수정 버튼

// 회원정보 수정 모달창 열기
userModifyBtn.addEventListener('click', () => {
    userModifyModal.style.display = 'flex';
});

// 회원정보 수정 모달창 닫기
function userModifyModalClose() {
    userModifyModal.style.display = 'none';
}
modifyCloseBtn.addEventListener('click', () => {
    userModifyModalClose();
});

// 다음 주소 API
userZipcodeBtn.addEventListener('click', () => {
    new daum.Postcode({
        oncomplete: function (data) {
            let addr = ''; // 주소 변수
            let extraAddr = ''; // 참고항목 변수

            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            if (data.userSelectedType === 'R') {
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }

                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr +=
                        extraAddr !== ''
                            ? ', ' + data.buildingName
                            : data.buildingName;
                }

                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
            } else {
                addrInput2.value = '';
            }

            document.getElementsByClassName('user_addr_zipcode')[0].value =
                data.zonecode;
            document.getElementsByClassName('user_addr_addr1')[0].value = addr;
            document.getElementsByClassName('user_addr_addr2')[0].focus();
            document.getElementsByClassName('user_addr_addr2')[0].value = '';
        },
    }).open();
});

//회원정보 수정 버튼 => 백엔드 db에 저장하고 localstorage에 jwt 토큰으로 저장?
userInfoModifyBtn.addEventListener('click', () => {
    const userName = document.getElementById('manage_name').value;
    const userEmail = document.getElementById('manage_email').value;
    const userPhoneNumber1 =
        document.getElementById('manage_phone_first').value;
    const userPhoneNumber2 = document.getElementById('manage_phone').value;
    const userPhoneNumberFull = userPhoneNumber1 + userPhoneNumber2;

    const userZipCode =
        document.getElementsByClassName('user_addr_zipcode')[0].value;
    const userAddress1 =
        document.getElementsByClassName('user_addr_addr1')[0].value;
    const userAddress2 =
        document.getElementsByClassName('user_addr_addr2')[0].value;
    const userAddressFull = `${userAddress1} ${userAddress2}`;
    console.log(userName, userEmail, userPhoneNumberFull, userAddressFull);
    let userInfoModifyAlert = confirm(
        `이름: ${userName}\n이메일: ${userEmail}\n휴대전화: ${userPhoneNumber1}-${userPhoneNumber2}\n우편번호: ${userZipCode}\n주소: ${userAddressFull}\n\n해당 정보로 수정하시겠습니까?1`,
    );

    userInfoModifyAlert === true
        ? (alert('수정되었습니다'), userModifyModalClose())
        : (alert('취소되었습니다'), userModifyModalClose());
});
