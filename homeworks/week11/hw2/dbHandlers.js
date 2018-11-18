const DB = require('./db.js')

module.exports = {
    //A. 有沒有存過了
    longURLExist: function(u_longURL){
        return DB.createURLtb().findOne({where: {longURL: u_longURL}})
    },
    //B. 拿最新的 id 算新的短網址
    getLastId: function(){
        return DB.createURLtb().max('id')
    },
    //C. 新增短網址
    createShortURL: function(new_shortURL, u_longURL){
        DB.createURLtb().create(
            {longURL: u_longURL}
        ).then(()=>{
            DB.createURLtb().update(
                {shortURL: new_shortURL},
                {where: {longURL: u_longURL}}
            )
        })
    },
    //D. 拿短網址
    getShortURL: function(u_longURL){
        return DB.createURLtb().findOne({where: {longURL: u_longURL}})
    },
    //E. 拿長網址
    getLongURL: function(u_shortURL){
        return DB.createURLtb().findOne({where: {shortURL: u_shortURL}})
    }
}