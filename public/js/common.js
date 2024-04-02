//display name
$('.displayName').on('click', function() {
    window.location.href='login.html'
  })
  
  
  //로그인 버튼
  $("#btnLogin").on('click', function () {
    let loginEmail = $("#loginEmail").val();
    let loginPwd = $("#loginPwd").val();
  
    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPwd).then((result) => {
      // 로그인이 성공하면
      //console.log(result.user); // uid가 발급된 유저번호
      
      // 로그인한 사용자의 정보를 로컬 스토리지에 저장
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // index.html 페이지로 리다이렉트
      window.location.href = 'index.html';
    });
  });
  
    //유저정보 확인
    // 로컬 스토리지에서 사용자 정보를 가져옴
    let localUser = localStorage.getItem('user');
    // 로그인한 사용자 정보가 있는지 확인
    if (localUser) {
      // 사용자 정보가 있다면 displayName을 표시
      let displayName = JSON.parse(localUser).displayName;
      $('.displayName').text(displayName);
    }
   
  
  
      //.onAuthStateChanged-사용자의 로그인상태가 변할 때 실행 
      //로그인시/로그아웃시/새로고침
      /* firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          //사용자가 로그인한 경우
          //console.log(user)
          //console.log(user.uid)
          //console.log(user.displayName)
          localStorage.setItem('user',JSON.stringify(user))
        }
      })
      }); */    


      $('#btnLogout').on('click',function(){
        //로컬스토리지에서 사용자 데이터 삭제
        localStorage.removeItem('user')
        alert('로그아웃 되었습니다.')
        window.location.href='index.html'
      })