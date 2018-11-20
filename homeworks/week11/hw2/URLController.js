const DB = require('./dbHandlers.js')
const crypto = require('crypto')
module.exports = {
    //A. 輸入網址
    URL: function(req, res){
        //1. 取得長網址
        u_longURL = req.body.longURL
        //2. 確認輸入的網址有沒有資料了
        DB.searchURLtbBylongURL(u_longURL)
        .then((result)=>{
            if(result != null){//3. 有存過了
                //4. 給一樣的
                res.render('index', {shortURL: result.shortURL})
            }else{
                //5. 沒存過給新的
                new_shortURL = crypto.randomBytes(3).toString('hex')
                console.log(new_shortURL);
                DB.createShortURL(new_shortURL, u_longURL)
                res.render('index', {shortURL: new_shortURL})
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