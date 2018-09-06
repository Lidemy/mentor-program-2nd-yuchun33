function capitalize(str) {
    var captialStr = str
    if(str.charCodeAt(0)<=122 && str.charCodeAt(0)>=97){
        captialStr = captialStr[0].toUpperCase() + str.slice(1)
        return captialStr
    } else {
        return captialStr
    }
}

//console.log(capitalize('nick'))
//console.log(capitalize('Nick'))
//console.log(capitalize(',hello'))