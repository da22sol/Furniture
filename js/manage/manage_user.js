// 현재 로그인 되어 있는 계정 토큰 불러오기
const ISADMIN = localStorage.getItem('isAdmin');

window.addEventListener('load', () => {
    if (ISADMIN !== 'true') {
        alert('🚫관리자만 접근가능합니다');
        location.href = '/index.html';
    }
});

const userZipcodeBtn = document.getElementsByClassName(
    'user_addr_search_zipcode',
)[0];
const userModifyModal = document.getElementById('modal_usercheck');
const modifyCloseBtn = document.getElementsByClassName('btn_close_modal')[0];

// 회원정보 수정 모달 input
const manageName = document.getElementById('manage_name');
const manageEmail = document.getElementById('manage_email');
const managePhone1 = document.getElementById('manage_phone_first');
const managePhone2 = document.getElementById('manage_phone');
const manageZipcode = document.getElementsByClassName('user_addr_zipcode')[0];
const manageAddr1 = document.getElementsByClassName('user_addr_addr1')[0];
const manageAddr2 = document.getElementsByClassName('user_addr_addr2')[0];

// 현재 로그인 되어 있는 계정 토큰 불러오기
const USERTOKEN = localStorage.getItem('userToken');

// 전체 회원 정보 불러오기
fetch('http://kdt-sw-5-team01.elicecoding.com/api/users', {
    method: 'GET',
    headers: {
        // 로그인 후 받은 토큰을 헤더에 추가
        Authorization: `Bearer ${USERTOKEN}`,
    },
})
    .then((res) => res.json())
    .then((userData) => {
        // 회원 리스트 넣기
        for (let i = 0; i < userData.length; i++) {
            let userJoinDate = userData[i].createdAt.slice(0, 10);

            document.getElementsByClassName('table')[0].innerHTML += `
            <tr>
                <td>${userJoinDate}</td>
                <td>${userData[i].email}</td>
                <td>${userData[i].fullName}</td>
                <td><select name="account_member" id="account_member" class = "manage_select">
                        <option class="acc_mem">일반사용자</option>
                        <option class="acc_mem manager">관리자</option>
                    </select></td>
                <td><button class="manage_modify_btn">회원정보조회</button></td>
                <td><button class="manage_delete_btn">회원정보삭제</button></td>
            </tr>
            `;

            // 관리자 체크
            if (userData[i].role == 'admin') {
                document
                    .getElementsByClassName('manager')
                    [i].setAttribute('selected', 'true');
            }
        }

        // 회원 정보 조회
        let manageModifyBtns = document.querySelectorAll('.manage_modify_btn');
        manageModifyBtns.forEach((btn, i) => {
            btn.addEventListener('click', function () {
                userModifyModal.style.display = 'flex';
                manageName.value = userData[i].fullName;
                manageEmail.value = userData[i].email;
                managePhone1.value = userData[i].phoneNumber.slice(0, 3);
                managePhone2.value = userData[i].phoneNumber.slice(3);
                manageZipcode.value = userData[i].address.postalCode;
                manageAddr1.value = userData[i].address.address1;
                manageAddr2.value = userData[i].address.address2;
            });
        });

        // 회원 삭제
        let manageDeleteBtns = document.querySelectorAll('.manage_delete_btn');

        manageDeleteBtns.forEach((btn, i) => {
            btn.addEventListener('click', function () {
                fetch(
                    `http://kdt-sw-5-team01.elicecoding.com/api/users/${userData[i]._id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${USERTOKEN}`,
                        },
                    },
                )
                    .then((res) => res.json())
                    .then((res) => {
                        alert('해당 회원이 삭제되었습니다!');
                        location.reload();
                    });
            });
        });

        // 회원 권한 변경
        let manageRoleSelect = document.querySelectorAll('.manage_select');

        manageRoleSelect.forEach((option, i) => {
            option.addEventListener('change', () => {
                const selectedValue = option.value;
                let manageRight = 'admin';
                selectedValue == '관리자'
                    ? (manageRight = 'admin')
                    : (manageRight = 'basic-user');

                const manageAuth = {
                    role: manageRight,
                };

                fetch(
                    `http://kdt-sw-5-team01.elicecoding.com/api/users/${userData[i]._id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${USERTOKEN}`,
                        },
                        body: JSON.stringify(manageAuth),
                    },
                )
                    .then((res) => res.json())
                    .then((data) => {});
            });
        });
    });

// 모달창 닫기
modifyCloseBtn.addEventListener('click', () => {
    userModifyModal.style.display = 'none';
});
