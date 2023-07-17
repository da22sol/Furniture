// 현재 로그인 되어 있는 계정 토큰 불러오기
const USERTOKEN = localStorage.getItem('userToken');

// 회원 정보 가져오기
fetch('http://kdt-sw-5-team01.elicecoding.com/api/account', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${USERTOKEN}`,
    },
})
    .then((res) => res.json())
    .then((loginUserdata) => {
        console.log(loginUserdata);
        const welcomeUserName = document.querySelector('.welcome_user_name');
        welcomeUserName.innerHTML = `<span>${loginUserdata.fullName}</span>님 반갑습니다!`;

        const userName = document.getElementById('manage_name');
        const userEmail = document.getElementById('manage_email');
        const userPhoneNumber1 = document.getElementById('manage_phone_first');
        const userPhoneNumber2 = document.getElementById('manage_phone');
        const userZipCode =
            document.getElementsByClassName('user_addr_zipcode')[0];
        const userAddress1 =
            document.getElementsByClassName('user_addr_addr1')[0];
        const userAddress2 =
            document.getElementsByClassName('user_addr_addr2')[0];

        userName.value = loginUserdata.fullName;
        userEmail.value = loginUserdata.email;
        userPhoneNumber1.value = loginUserdata.phoneNumber.slice(0, 3);
        userPhoneNumber2.value = loginUserdata.phoneNumber.slice(3);
        userZipCode.value = loginUserdata.address.postalCode;
        userAddress1.value = loginUserdata.address.address1;
        userAddress2.value = loginUserdata.address.address2;

        // 회원정보 수정
        userInfoModifyBtn.addEventListener('click', () => {
            const userName = document.getElementById('manage_name').value;
            const userEmail = document.getElementById('manage_email').value;
            const userPhoneNumber1 =
                document.getElementById('manage_phone_first').value;
            const userPhoneNumber2 =
                document.getElementById('manage_phone').value;
            const userPhoneNumberFull = userPhoneNumber1 + userPhoneNumber2;

            const userZipCode =
                document.getElementsByClassName('user_addr_zipcode')[0].value;
            const userAddress1 =
                document.getElementsByClassName('user_addr_addr1')[0].value;
            const userAddress2 =
                document.getElementsByClassName('user_addr_addr2')[0].value;
            const userAddressFull = `${userAddress1} ${userAddress2}`;
            console.log(
                userName,
                userEmail,
                userPhoneNumberFull,
                userAddressFull,
            );
            let userInfoModifyAlert = confirm(
                `이름: ${userName}\n이메일: ${userEmail}\n휴대전화: ${userPhoneNumber1}-${userPhoneNumber2}\n우편번호: ${userZipCode}\n주소: ${userAddressFull}\n\n해당 정보로 수정하시겠습니까?`,
            );

            const userDataJSON = JSON.stringify({
                fullName: userName,
                phoneNumber: userPhoneNumberFull,
                postalCode: userZipCode,
                address1: userAddress1,
                address2: userAddress2,
            });

            userInfoModifyAlert === true
                ? (fetch(`http://kdt-sw-5-team01.elicecoding.com/api/account`, {
                      method: 'PATCH',
                      headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${USERTOKEN}`,
                      },
                      body: userDataJSON,
                  })
                      .then((res) => res.json())
                      .then((data) => {
                          console.log(data);
                      }),
                  alert('수정되었습니다'),
                  userModifyModalClose())
                : alert('취소되었습니다');
        });

        // 회원탈퇴
        accountDeleteBtn.addEventListener('click', () => {
            let withdrawal = confirm('회원을 탈퇴하시겠습니까?');
            if (withdrawal === true) {
                //fetch delete 통신
                fetch('http://kdt-sw-5-team01.elicecoding.com/api/account', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${USERTOKEN}`,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                    });
                alert(`탈퇴되었습니다\n이용해주셔서 감사합니다.`);
                localStorage.removeItem('userToken');
                localStorage.removeItem('isAdmin');
                window.location.href = '/index.html';
            } else {
                alert('취소되었습니다.');
            }
        });
    });

// 회원 정보 레이아웃

const accountDeleteBtn = document.querySelector('.account_delete'); // 회원탈퇴 버튼

// 회원정보 수정 모달
const userModifyBtn = document.getElementsByClassName('account_modify')[0];
const userZipcodeBtn = document.getElementsByClassName(
    'user_addr_search_zipcode',
)[0];
const userModifyModal = document.getElementById('modal_usercheck');
const modifyCloseBtn = document.getElementsByClassName('btn_close_modal')[0];
const userInfoModifyBtn = document.querySelector(
    '.btn_user_information button',
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



// 로그아웃
const sideLogoutBtn = document.getElementsByClassName("side_logout_btn")[0];
sideLogoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("cartItems");
    location.href = "/html/login.html";
})
