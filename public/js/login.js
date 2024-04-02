// //데이터베이스 가져오기
// const db = firebase.firestore();

// $('#btnLogin').on('click',function(){
//     let loginEmail = $('#loginEmail').val() 
//     let loginPwd = $('#loginPwd').val()


//     firebase.auth().signInWithEmailAndPassword(loginEmail,loginPwd).then((result)=>{
//         console.log(result)
//         console.log(result.user) // uid가 발급된 유저번호
//         window.location.href = 'index.html'
//     })
// })
// $('#btnLogout').on('click',function(){
//     firebase.auth().signOut()
// })