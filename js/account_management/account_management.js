// 회원 정보 레이아웃
const accountModifyBtn = document.querySelector('.account_modify'); // 정보수정 버튼
const accountDeleteBtn = document.querySelector('.account_delete'); // 회원탈퇴 버튼
const couponBtn = document.querySelector('.coupon'); // 쿠폰 버튼

// 정보수정 => 회원정보 수정 모달창 보이기
accountModifyBtn.addEventListener('click', () => {
    console.log('modify');
    modalUserCheck.style.display = 'block';
});

// 회원탈퇴 => 회원탈퇴 fetch 연결 필요
accountDeleteBtn.addEventListener('click', () => {
    alert('회원을 탈퇴하시겠습니까?');
});

// 쿠폰 => 추후 예정?
couponBtn.addEventListener('click', () => {
    console.log('현재 보유한 쿠폰 : 0');
});

// 회원정보 모달
const modalUserCheck = document.querySelector('#modal_usercheck'); // 회원정보 수정 모달창
const modalOutBtn = document.querySelector('.btn_close_modal'); // 모달 나가기 버튼
const userInfoModifyBtn = document.querySelector(
    '.btn_user_information_modify',
); // 모달 내 수정 버튼

// 회원정보 모달 내 나가기 => 회원정보 수정 모달창 숨기기
modalOutBtn.addEventListener('click', () => {
    modalUserCheck.style.display = 'none';
});

//회원정보 수정 버튼 => 백엔드 db에 저장하고 localstorage에 jwt 토큰으로 저장?
userInfoModifyBtn.addEventListener('click', () => {
    const userName = document.getElementById('manage_name').value;
    const userEmail = document.getElementById('manage_email').value;
    const userPhoneNumberFirst =
        document.getElementById('manage_phone_first').value;
    const userPhoneNumber = document.getElementById('manage_phone').value;
    const userPhoneNumberFull = userPhoneNumberFirst + userPhoneNumber;
    const userAddress = document.getElementById('manage_address').value;
    console.log(
        userName,
        userEmail,
        userPhoneNumber,
        userPhoneNumberFirst,
        userAddress,
        userPhoneNumberFull,
        typeof userPhoneNumberFull,
    );
});
