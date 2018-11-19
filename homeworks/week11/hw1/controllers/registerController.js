const db = require('../models/dbhandlers')
module.exports = {
    //A. 註冊頁面
    registerPage: (req, res)=>{
        res.render('register')
    },
    //B. 註冊檢查
    registerHandler: (req, res)=>{
        let email = req.body.userEmail
        let password = req.body.password
        let doublePassword = req.body.doublePassword
        let nickname = req.body.nickname
        if(password!=doublePassword){
            console.log('輸入的密碼不一致')//怎麼直接顯示
        } else {
            db.newRegister(email, password, nickname)
            .then(()=>{
                console.log('註冊成功')
                db.getComments().then((dbresult)=>{
                    res.render('main',{user: nickname||'', result: dbresult})
                    //Q: 這邊應該要導向還是直接render?，現在這樣會是 http://localhost:3000/register，導向才會是 http://localhost:3000/comments
                })
            }) 
        }
    }
}