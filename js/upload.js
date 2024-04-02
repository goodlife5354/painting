//데이터베이스 가져오기
const db = firebase.firestore();
//이미지 업로드 -> firestorage
const storage = firebase.storage();

//랜덤한 아이디로 document가 생성
/* db.collection('product').add({
    title: '게맛살',
    price: 1000
}) */

/* 
    then() 그리고 .catch()를 각각  붙이고
    그 안에 실행될 함수를 () => {}(화살표 함수) 선언
    각각 성공시 , 실행시, 에러가 났을 때 실행할 코드 작성

    const storage = firebase.storage();
    var storageRef = storage.ref();
    var 저장할경로 = storageRef.child('image/' + '파일명');
    var 업로드작업 = 저장할경로.put(업로드한 파일 JS로 찾은거)
*/
$('#send').on('click', function () {
    //form 요소에 입력된 정보
    let file = document.querySelector('#image').files[0];
    let storageRef = storage.ref(); //스토리지 주소 참조
    let storagePath = storageRef.child('image/' + file.name); //이미지 저장경로
    let uploadImg = storagePath.put(file); //업로드 파일

    //이미지 업로드 성공(then)/실패(catch) => 이미지 업로드시 용량의 문제가 있을 수 있으므로 이 코드 필요
    uploadImg.on('state_changed', //storage가 상태가 변하면(업로드성공/에러/업로드 중)
        //변화시 동작하는 함수
        null,
        //에러났을 때 동작하는 함수
        (error) => {
            console.log('실패사유는', error)
        },
        //이미지 업로드가 성공
        () => {
            uploadImg.snapshot.ref.getDownloadURL().then((url) => {
                console.log("업로드된 경우는", url);

                let uploadProduct = {
                    title: $('#title').val(),
                    content: $('#content').val(),
                    price: Number($('#price').val()),
                    date: new Date(),
                    image: url
                }

                //데이터베이스에 업로드 성공(then)/실패(catch)
                db.collection('recipe').add(uploadProduct).then((result)=>{
                    //성공 후에 실행할 코드
                    alert('상품을 저장했습니다.')
                    console.log(result.id)
                    window.location.href='index.html'
                 }).catch((err)=>{
                    //실패 후에 실행할 코드
                    console.log(err)
                 })
              });
            }
        )}
);
