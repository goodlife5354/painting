//데이터베이스 가져오기
const db = firebase.firestore();

//구글 인증 기능 추가
var provider = new firebase.auth.GoogleAuthProvider()

//회원 가입시키는 코드
//firebase.auth().creatUserWithEmailAndPassword(이메일/패스워드)

//성공하면 then 실패하면 catch

/*
firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
    console.log(result)
    console.log(result.user)
})
*/


//가입하기 버튼을 클릭
$('#register').on('click',function(){
    let userName= $('#name_new').val()
    let userEmail= $('#email_new').val()
    let userPwd= $('#password_new').val()

    firebase.auth().createUserWithEmailAndPassword(userEmail,userPwd).then((result)=>{
        console.log(result)
        console.log(result.user)

        //가입기능 업그레이드 : 이름표시
        result.user.updateProfile({
            displayName: userName
        }).then ((
            alert("회원가입이 완료되었습니다."),
            window.location.href = 'login.html'
        )).catch ((
            console.log("정보를 다시 입력해주세요.",error)
        ))
    })
})



//구글 인증하기

$('#loginGoogle').on('click', function() {
    firebase.auth().signInWithPopup(provider).then(function(result){
        //var token = result.credential.accessToken;
        var user = result.user;
        window.location.href = 'index.html'
        console.log(user); //인증 후 어떤 데이터를 받아오는지 확인하는 용도        
    }).catch(function(error) {
        console.log('실패사유는 ', error)
    })
})