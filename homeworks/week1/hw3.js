function reverse(str) {
    var revStr = ''
    for (var i=str.length-1; i>=0; i--){
        revStr += str[i]
    }
    console.log(revStr)
}

//reverse('yoyoyo')
//正確輸出：oyoyoy

//reverse('1abc2')
//正確輸出：2bca1

//reverse('1,2,3,2,1')
//正確輸出：1,2,3,2,1