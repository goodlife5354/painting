//데이터베이스 가져오기
const db = firebase.firestore();

db.collection('recipe').get().then((result) => {
    //console.log(result)
    result.forEach((doc) => {
        console.log(doc.data());

        const timestamp = doc.data().date; //firebase에서 가져온 timestamp 값
        const date = timestamp.toDate();
        const year = date.getFullYear();        
        const month = ('0'+(date.getMonth()+1)).slice(-2);
        
        const day = ('0' + date.getDate()).slice(-2);         
        let price = doc.data().price.toLocaleString();

        //document id -> upload.js에서 랜덤값으로 부여된 아이디
        const docId = doc.id;
        console.log(docId)

        //div 갯수만큼 반복해서 출력
        let product = `<div class="product">
                        <div class="thumbnail" style="background-image: url('${doc.data().image}');"></div>
                        <div class="flex-grow-1 text-box">
                            <h5 class="title">${doc.data().title}</h5>
                            <p class="date">${year}/${month}/${day}</p>
                            <p class="price">${price}</p>
                            <p class="content">${doc.data().content}</p>

                            <button type="button" class="button btnModify">수정</button>
                            <button type="button" class="button btnDelete" data-id="${docId}">삭제</button>
                            <p class="float-end like">❤ 0</p>
                        </div>
                    </div>`;
        $('.container').append(product)
    });

    //삭제버튼 클릭 이벤트
    $('.btnDelete').on('click', function() {
        //삭제할 문서의 Id 가져옴
        const docId = $(this).data('id');
        console.log(docId)

        // 해당문서를 삭제
         db.collection('recipe').doc(docId).delete().then(()=>{
            alert('문서가 성공적으로 삭제되었습니다.');

            //화면에서 삭제된 문서 내용을 삭제
            $(this).closest('.product').remove();
         }).catch((error)=> {
            console.log("문서 삭제 중 에러가 발생됐습니다.", error)
         })
    })
})

/*
data - html 요소에 사용자정의 데이터를 저장하는 html5의 data 속성
임의의 데이터를 요소에 연결해서 javascript나 css에서 호출
data - id = ${docId} 삭제버튼에 대한 사용자 정의 데이터를 설정
let id = $('#section').data('id')
해당요소에 연결된 data-id값을 호출
html요소와 관련된 식별자 또는 관련된 다른 종류를 저장하기 위해 사용


<div data-* ="value"></div>
*에는 속성이름의 한가지로 원하는 이름을 뭐든 선언
data-name/data-age/data-city

<div id="testElement" data-name="kris" data-age="20" data-city="seoul"></div>
let element = document.querySelector('')
let name = element.dataset.name  // kris

사용자 정의 데이터는 html요소와 관련된 추가 정보를 저장해주고 javascript나 css에서 해당정보를 액세스할때 유용

*/
