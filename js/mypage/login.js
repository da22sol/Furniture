// 로그인 정보
const loginBtn = document.getElementById("login_submit");
const loginId = document.getElementById("id");
const loginPw = document.getElementById("pw");


// 유저 정보
const USERID_KEY = "userid";
const savedUserid = localStorage.getItem(USERID_KEY);
const savedUsername = savedUserid.substring(0, savedUserid.indexOf('@'));

loginBtn.addEventListener("click", onLoginSubmit);

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
    const req = {
        email: email,
        password: password,
    };

    const dataJson = JSON.stringify(req);

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: dataJson,
    })

    if (req.status === 200) {
        alert(`Hello ${savedUsername}`);
        localStorage.setItem(USERID_KEY, req.email);
        location.href("/index.html"); // 메인 페이지로 이동
    } else {
        alert("로그인 실패");
    }

}


export default {
    loginBtn,
    USERID_KEY,
    savedUserid,
    onLoginSubmit,
};
