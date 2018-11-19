const db = require('../models/dbhandlers')
const crypto = require('crypto')
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
        db.existUser(username)
        .then(()=>{
            //3. 密碼正確嗎
            db.getUserPassword(username)
            .then(result=>{
                db_password = result[0].password
                let md5 = crypto.createHash('md5')//有其他方法ㄇ?
                let u_password_md5 = md5.update(password, 'utf8').digest('hex');                  
                if(u_password_md5 == db_password){
                    console.log('登入成功');
                    //4. 給 token //5. 設 cookie
                    db.getUserNickname(username)          
                    .then(result=>{
                        req.session.nickname = result[0].nickname
                        console.log('設定session: ',req.session.nickname)
                    }).catch((err)=>{
                        console.error(err);
                    })
                    //6. 進入留言板
                    db.getComments()
                    .then((dbresult)=>{
                        res.render('main',{user: req.session.nickname, result: dbresult})
                    })
                } else {
                    console.log('密碼錯誤')
                    res.redirect('/')
                }
            })
        })
    },
    //C. 登出
    logoutHandler: (req, res)=>{
        req.session.destroy()
        res.redirect('/')
    }

}