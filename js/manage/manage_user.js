const userEditFinBtn = document.getElementsByClassName(
    'btn_user_information',
)[0];
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

const manageUserList = [
    {
        _id: '64ad56ced2904fa5c6d554c8',
        email: 'elice3@test.com',
        password:
            '$2b$08$NEIJN7Jgw037ScigRVkUdOB83ABYm2pguzL4BG9sp0sqDe794gG/.',
        fullName: 'elice1',
        phoneNumber: '0102345678',
        address: {
            postalCode: '00000',
            address1: '부산 해운대구 센텀동로 41',
            address2: '센텀벤처타운 6층',
        },
        role: 'admin',
        createdAt: '2023-07-11T13:19:10.253Z',
        updatedAt: '2023-07-11T13:22:15.760Z',
        __v: 0,
    },
    {
        _id: '64ad56ced2904fa5c6d554c8',
        email: 'elice3@test.com',
        password:
            '$2b$08$NEIJN7Jgw037ScigRVkUdOB83ABYm2pguzL4BG9sp0sqDe794gG/.',
        fullName: 'elice2',
        phoneNumber: '0102345678',
        address: {
            postalCode: '11111',
            address1: '부산 해운대구 센텀동로 41',
            address2: '센텀벤처타운 6층',
        },
        role: 'user',
        createdAt: '2023-07-11T13:19:10.253Z',
        updatedAt: '2023-07-11T13:22:15.760Z',
        __v: 0,
    },
    {
        _id: '64ad56ced2904fa5c6d554c8',
        email: 'elice3@test.com',
        password:
            '$2b$08$NEIJN7Jgw037ScigRVkUdOB83ABYm2pguzL4BG9sp0sqDe794gG/.',
        fullName: 'elice3',
        phoneNumber: '0102345678',
        address: {
            postalCode: '12345',
            address1: '부산 해운대구 센텀동로 41',
            address2: '센텀벤처타운 6층',
        },
        role: 'admin',
        createdAt: '2023-07-11T13:19:10.253Z',
        updatedAt: '2023-07-11T13:22:15.760Z',
        __v: 0,
    },
];

for (let i = 0; i < manageUserList.length; i++) {
    const userJoinDate = manageUserList[i].createdAt.slice(0, 10);

    document.getElementsByClassName('table')[0].innerHTML += `
    <tr>
        <td>${userJoinDate}</td>
        <td>${manageUserList[i].email}</td>
        <td>${manageUserList[i].fullName}</td>
        <td><select name="account_member" id="account_member" class = "manage_select">
                <option class="acc_mem">일반사용자</option>
                <option class="acc_mem manager">관리자</option>
            </select></td>
        <td><button class="manage_modify_btn">회원정보수정</button></td>
        <td><button class="manage_delete_btn">회원정보삭제</button></td>
    </tr>
    `;

    // 관리자 체크
    if (manageUserList[i].role == 'admin') {
        document
            .getElementsByClassName('manager')
            [i].setAttribute('selected', 'true');
    }
}

// 모달창 열기
let manageModifyBtns = document.querySelectorAll('.manage_modify_btn');
manageModifyBtns.forEach((btn, i) => {
    btn.addEventListener('click', function () {
        userModifyModal.style.display = 'flex';
        manageName.value = manageUserList[i].fullName;
        manageEmail.value = manageUserList[i].email;
        managePhone1.value = manageUserList[i].phoneNumber.slice(0, 3);
        managePhone2.value = manageUserList[i].phoneNumber.slice(3);
        manageZipcode.value = manageUserList[i].address.postalCode;
        manageAddr1.value = manageUserList[i].address.address1;
        manageAddr2.value = manageUserList[i].address.address2;
    });
});

// 회원 권한 변경
let manageRoleSelect = document.querySelectorAll('.manage_select');

manageRoleSelect.forEach((option) => {
    option.addEventListener('change', () => {
        const selectedValue = option.value;
        let manageRight = 'admin';
        selectedValue == '관리자'
            ? (manageRight = 'admin')
            : (manageRight = 'user');
        console.log(manageRight);
        const manageAuth = {
            role: manageRight,
        };

        fetch(`/users:userId`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(manageAuth),
        }).then((res) => {
            if (res.ok) {
                console.log('권한이 변경되었습니다.');
            } else {
                console.log('권한 변경 중에 문제가 발생했습니다.');
            }
        });
    });
});

// 회원 삭제
let manageDeleteBtns = document.querySelectorAll('.manage_delete_btn');
manageDeleteBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        fetch(`/users:userId`, {
            method: 'DELETE',
        }).then((res) => {
            if (res.ok) {
                console.log('회원이 성공적으로 삭제되었습니다.');
            } else {
                console.log('회원 삭제 중에 문제가 발생했습니다.');
            }
        });
    });
});

// 회원 정보 수정
userEditFinBtn.addEventListener('click', onEditUserInfo);

function onEditUserInfo() {
    const userData = {
        fullName: manageName.value,
        email: manageName.value,
        phoneNumber: managePhone1.value + managePhone2.value,
        address: {
            postalCode: manageZipcode.value,
            address1: manageAddr1.value,
            address2: manageAddr2.value,
        },
    };

    fetch(`/users:userId`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    }).then((res) => {
        if (res.ok) {
            console.log('회원 정보가 성공적으로 수정되었습니다.');
        } else {
            console.log('회원 정보 수정 중에 문제가 발생했습니다.');
        }
    });
}

// 관리자 권한

// 모달창 닫기
modifyCloseBtn.addEventListener('click', () => {
    userModifyModal.style.display = 'none';
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
