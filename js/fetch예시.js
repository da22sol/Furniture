//https://velog.io/@ahn-sujin/JS-fetch%ED%95%A8%EC%88%98 참고

//첫번째 응답 분기처리 예시

fetch('API주소', {
    method: 'POST', // GET, POST, PATCH, DELETE 사용
    headers: {
        'Content-Type': 'application/json;charset=utf-8', // POST는 해당 타입 필수
    },
    body: JSON.stringify({
        title: 'update title',
        content: '서버에 요청할때 담아서 보내는 정보',
    }), // 서버에 보낼 정보가 있는경우
})
    .then((response) => {
        if (response.ok === true) {
            return response.json();
        }
        throw new Error('에러 발생!'); //reponse.ok가 true가 아닐 경우 error를 throw
    })
    .catch((error) => console.log(error)); //throw된 error를 받아서 console에 출력

//body가 없는 요청 예시
fetch('https://jsonplaceholder.typicode.com/users/1', { method: 'GET' });

//두번째 응답 분기처리 예시

fetch('로그인 API', {
    method: 'post',
    body: JSON.stringify({
        id: 'qawsedrf',
        password: '123456',
    }),
})
    .then((response) => {
        if (response.ok === true) {
            return response.json();
        }
        throw new Error('에러 발생!');
    })
    .catch((error) => console.log(error))
    .then((data) => {
        if (data.message === 'login success') {
            localStorage.setItem('TOKEN', data.token);
            alert('로그인 성공');
        } else {
            alert('로그인 실패');
        }
    });

/*
응답코드
200 : 클라이언트 요청 정상수행 (응답에 대한 메시지가 포함)
201 : 리소스 생성 요청에 대한 정상처리
202 : 리소스 생성 요청이 비동기적으로 처리될 때 사용
204 : 클라이언트 요청 정상수행 (응답에 대한 메시지 미포함, 보통 삭제요청에 사용)
400 : 클라이언트 요청이 부적절할 때 사용 (부적절한 이유를 응답 Body에 넣어줘야 함)
401 : 클라이언트가 인증되지 않은 상태에서 보호된 리소스를 요청할 때 사용
403 : 클라이언트가 인증상태와 무관하게 응답하고 싶지 않은 리소스를 요청할 때 사용 (400 사용을 권장)
404 : 클라이언트가 요청한 리소스가 존재하지 않을 때 사용
405 : 클라이언트가 불가능한 메소드를 사용했을 때
*/

// 장바구니 delete 통신 : 장바구니는 백엔드로 보내면 안되고 프론트단에서 해결해야함

// 회원 delete 통신
fetch('http://백엔드 주소/account', {
    method: 'DELETE',
    headers: {
        Authorization: localStorage.getItem('access_token'),
    },
    body: JSON.stringify({
        //삭제하고싶은 데이터의 회원 id
        account_id: data.account_id,
    }),
});
