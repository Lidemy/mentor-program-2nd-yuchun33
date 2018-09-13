function alphaSwap(str) {
    var swapStr = ''
    for(var i=0; i<str.length; i++){
        (str[i]>='a'&&str[i]<='z') ? swapStr += str[i].toUpperCase() : swapStr += str[i].toLowerCase()
    }    
    return swapStr
}

module.exports = alphaSwap

