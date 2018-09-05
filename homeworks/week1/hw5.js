function join(str, concatStr) {
    var joinStr = ''
    for(var i=0; i<str.length-1; i++){
        joinStr += str[i]
        joinStr += concatStr
    }
    joinStr += str[str.length-1]
    return joinStr

}

function repeat(str, times) {
    var repeatStr = ''
    for(var i=0; i<times; i++){
        repeatStr += str
    }
    return repeatStr

}

/*
console.log(join([1, 2, 3], ''))
//正確回傳值：123
console.log(join(["a", "b", "c"], "!"));
//正確回傳值：a!b!c
console.log(join(["a", 1, "b", 2, "c", 3], ','));
//正確回傳值：a,1,b,2,c,3

console.log(repeat('a', 5));
//正確回傳值：aaaaa
console.log(repeat('yoyo', 2));
//正確回傳值：yoyoyoyo
*/