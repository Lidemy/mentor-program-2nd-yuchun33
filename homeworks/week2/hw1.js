function stars(n) {
    var result = []
    for(var i=1; i<=n; i++){
        var ele = ""
        for(var j=1; j<=i; j++){
            ele += "*"
        }
        result.push(ele)
    }
    return result
}

module.exports = stars;