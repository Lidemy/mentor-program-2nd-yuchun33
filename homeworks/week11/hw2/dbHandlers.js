const DB = require('./db.js')

module.exports = {
    //A. 用長網址找 URLtb
    searchURLtbBylongURL: function(u_longURL){
        return DB.URLtb.findOne({where: {longURL: u_longURL}})
    },
    //B. 新增短網址
    createShortURL: function(new_shortURL, u_longURL){
        DB.URLtb.create(
            {longURL: u_longURL}
        ).then(()=>{
            DB.URLtb.update(
                {shortURL: new_shortURL},
                {where: {longURL: u_longURL}}
            )
        })
    },
    //C. 拿長網址
    getLongURL: function(u_shortURL){
        return DB.URLtb.findOne({where: {shortURL: u_shortURL}})
    }
}