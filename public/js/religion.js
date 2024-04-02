//데이터베이스 가져오기
const db = firebase.firestore();

db.collection('religion').get().then((result) => {
    // console.log(result)
    result.forEach((doc) => {
        console.log(doc.data());

        //날짜 정보를 변환 -> timestamp -> date()객체로 변환
        const timestamp = doc.data().date; //firebase에서 가져온 timestamp 값
        //console.log(timestamp)
        const date = timestamp.toDate();
        //console.log(date);
        const year = date.getFullYear();        
        const month = ('0'+(date.getMonth()+1)).slice(-2); //월은 0부터 시작되므로 1을 더하고, 두자리로 만들기위해서 전체 배열값에서 뒤에서 2자리를 슬라이스함.
        
        const day = ('0' + date.getDate()).slice(-2); 
        //console.log(day)

        /* 
            가격(price)를 세자리 숫자 콤마 형식로 변환
            -> 자바스크립트 내장함수 toLocaleString()
        */
    let price = doc.data().price.toLocaleString()
    let docId = doc.id 
    console.log(docId)
        //div 갯수만큼 반복해서 출력
        let product = `<div class="product">
                        <div class="thumbnail" style="background-image: url('${doc.data().image}');"></div>
                        <div class="flex-grow-1 text-box">
                            <h5 class="title"><a href='/religion_detail.html?id=${docId}'>${doc.data().title}</a></h5>
                            <p class="date">${year}/${month}/${day}</p>
                            <p class="price">${price}</p>
                            <p class="content">${doc.data().content}</p>
                            <p class="float-end like">❤ 0</p>
                        </div>
                    </div>`;

        $('.container').append(product)
    })
})