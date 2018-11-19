const DB = require('./dbHandlers.js')
const base62 = require('./convertBase64.js')
module.exports = {
    //A. 輸入網址
    URL: function(req, res){
        //1. 取得長網址
        u_longURL = req.body.longURL
        //2. 確認輸入的網址有沒有資料了
        DB.longURLExist(u_longURL)
        .then((result)=>{
            if(result != null){
                //3. 有存過了
                DB.getShortURL(u_longURL)
                //4. 給一樣的
                .then((result)=>{
                    res.render('index', {shortURL: result.shortURL})
                })
            }
            else{
                //5. 沒有存過給新的
                DB.getLastId()
                .then((lastId)=>{
                    //6. 算一個新的短網址
                    lastId = lastId+=1
                    let new_shortURL = base62(lastId)
                    DB.createShortURL(new_shortURL, u_longURL)
                    res.render('index', {shortURL: new_shortURL})
                })
            }
        })
    },
    //B. 輸入短網址
    redirect2Long: function(req, res){
        DB.getLongURL(req.params.u_shortURL)
        .then((result)=>{
            res.redirect(result.longURL)
        }).catch((err)=>{
            console.error(err);
        })
    }
}