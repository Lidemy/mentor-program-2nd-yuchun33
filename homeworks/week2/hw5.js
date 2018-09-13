var leftpad = require('left-pad')

function add(a, b) {
    (a.length > b.length) ? b = leftpad(b, a.length, 0) : a = leftpad(a, b.length, 0)
    console.log(a);
    console.log(b);
    var result = ""
    for(var i=0; i<a.length; i++){
        var roundUp = 0
        var numA = parseInt(a[i])
        var numB = parseInt(b[i])
        var numC = numA + numB + roundUp
        if(numC>=10){
            result = (numC-10) + result
            roundUp = 1
        }else{
            result = numC + result
            roundUp = 0
        }
    }
    if(roundUp>0) result = 1 + result
    return result
}

console.log(add('999','9999'))
console.log(add('2345678','999999999999'))
module.exports = add;