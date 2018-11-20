const db = require('../models/dbhandlers')
const crypto = require('crypto')
const verify = crypto.createVerify('md5');

module.exports = {
    //A. 登入頁面
    loginPage: (req, res) => {
        res.render('login')
    },
    //B. 登入檢查
    loginHandler: (req, res)=>{
        //1. 使用者輸入帳號密碼
        let username = req.body.username
        let password = req.body.password
        //2. 是否有這個使用者
        db.findUserByEmail(username)
        .then((result)=>{
            //3. 密碼正確嗎
            db_password = result.password
            let md5 = crypto.createHash('md5')//有其他方法ㄇ?有
            let u_password_md5 = md5.update(password, 'utf8').digest('hex');   
            if(u_password_md5 == db_password){
                console.log('登入成功');
                //4. 給 token //5. 設 cookie
                req.session.nickname = result.nickname
                console.log('設定session: ',req.session.nickname)
                //6. 進入留言板
                db.getComments()
                .then((dbresult)=>{
                    res.redirect('/comments')
                })
            } else {
                console.log('密碼錯誤')
                res.redirect('/')
            }
        })
    },
    //C. 登出
    logoutHandler: (req, res)=>{
        req.session.destroy()
        res.redirect('/')
    }

}