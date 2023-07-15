// 로그인 정보
const loginBtn = document.getElementById("login_submit");
const loginId = document.getElementById("id");
const loginPw = document.getElementById("pw");

// 로그인 폼 제출
loginBtn.addEventListener("click", onLoginSubmit);

// 로그인 유효성 검사
function onLoginSubmit(e) {
    e.preventDefault();

    // 유효성 검사
    if (loginId.value == "") {
        alert("❗️이메일을 입력해주세요.");
        loginId.focus();
    } else if (!loginId.value.includes("@")) {
        alert("❗️올바른 이메일 형태가 아닙니다.");
        loginId.focus();
    } else if (loginPw.value == "") {
        alert("❗️비밀번호를 입력해주세요.");
        loginPw.focus();
    } else if (loginPw.value.length < 6) {
        alert("❗️6자 이상 입력해주세요.");
        loginPw.focus();
    }

    // 입력값 가져오기
    const email = loginId.value;
    const password = loginPw.value;

    // 객체
    const loginData = {
        email: email,
        password: password,
    };

    const dataJson = JSON.stringify(loginData);

    fetch("http://kdt-sw-5-team01.elicecoding.com/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: dataJson,
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.userToken) {
                alert("로그인 성공!");
                // 유저 정보 로컬에 저장
                localStorage.setItem("userToken", data.userToken);
                localStorage.setItem("isAdmin", data.isAdmin);
                // 메인 페이지로 이동
                location.href = "/index.html";
            } else {
                alert("아이디 혹은 비밀번호를 확인해주세요.");
            }
        });
}

