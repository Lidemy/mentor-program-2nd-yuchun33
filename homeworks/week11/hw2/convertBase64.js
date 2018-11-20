//轉短網址
function convertBase64(id){
    const digitStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let shortURL = ''
    let v = id % digitStr.length
    shortURL+=digitStr[v]    
    id = Math.floor(id/digitStr.length) 
    while (id/digitStr.length>=64){
        let v = id % digitStr.length
        shortURL+=digitStr[v]
        id = Math.floor(id/digitStr.length)        
    }    
    if(id>0){
        shortURL+=digitStr[id]
    }
    return shortURL
}
module.exports = convertBase64