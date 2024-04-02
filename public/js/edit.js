//데이터베이스 가져오기
const db = firebase.firestore();
//이미지 업로드 -> firestorage
const storage = firebase.storage();

let queryString = new URLSearchParams(window.location.search);
// console.log(queryString.get('id'))
let recipeId = queryString.get('id')
db.collection('recipe').doc(recipeId).get().then((result) => {
    // console.log(result.data())
    $('#title').val(result.data().title)
    $('#content').val(result.data().content)
    $('#price').val(result.data().price)
})
$('#send').on('click',function(){
    let changeRecipe = {
        title: $('#title').val(),
        content: $('#content').val(),
        price: $('#price').val()
    }
    db.collection('recipe').doc(recipeId).update(changeRecipe).then(()=>{
        alert('수정하였습니다.')
        window.location.href = 'index.html'
    }).catch((error)=>{
        console.log('문서 수정중 에러발생', error)
    })
})


