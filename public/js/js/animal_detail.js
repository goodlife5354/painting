const db = firebase.firestore();
const storage = firebase.storage();

let queryString = new URLSearchParams(window.location.search);


db.collection('animal').doc(queryString.get('id')).get().then((result) => {

    const timestamp = result.data().date;
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    let price = result.data().price.toLocaleString();


    let detailProduct = `<div class="detail-pic my-4" style="background-image: url('${result.data().image}')"></div>
    <div class="productWrap">
      <p class="user">올린사람: 모름</p>
      <hr>
      <h3 class="title">${result.data().title}</h3>
      <p class="date">${year}/${month}/${day}</p>
      <p class="content">${result.data().content}</p>
      <p class="price">${price}</p>
    </div>`;

    $('.container').append(detailProduct)
});


// 수정버튼 클릭

$('.btnModify').on('click',function(){
    window.location.href = '/edit.html?id='+queryString.get('id')
})
//삭제버튼 클릭 이벤트
$('.btnDelete').on('click', function() {
    //삭제할 문서의 Id 가져옴
    let recipeId = queryString.get('id')
    // 해당문서를 삭제
     db.collection('animal').doc(recipeId).delete().then(()=>{
        alert('문서가 성공적으로 삭제되었습니다.');

        //화면에서 삭제된 문서 내용을 삭제
        $(this).closest('.product').remove();
        window.location.href = 'index.html'
     }).catch((error)=> {
        console.log("문서 삭제 중 에러가 발생됐습니다.", error)
     })
})