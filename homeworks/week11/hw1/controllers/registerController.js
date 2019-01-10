const db = require('../models/dbhandlers')
module.exports = {
    //A. 註冊頁面
    registerPage: (req, res)=>{
        res.render('register',{err:''})
    },
    //B. 註冊檢查
    registerHandler: (req, res)=>{
        let email = req.body.userEmail
        let password = req.body.password
        let doublePassword = req.body.doublePassword
        let nickname = req.body.nickname
        if(password!=doublePassword){
            const error = '輸入的密碼不一致'
            res.render('register', {err: error||''})
        } else {
            db.newRegister(email, password, nickname)
            .then(()=>{
                console.log('註冊成功')
                req.session.nickname = nickname
                res.redirect('/comments')
            }) 
                res.redirect('/')
            }) 
            .catch(()=>{
                const error = '此信箱已註冊過'
                res.render('register', {err: error||''})
            })
                res.redirect('/comments')
            }) 
        }
    }
}