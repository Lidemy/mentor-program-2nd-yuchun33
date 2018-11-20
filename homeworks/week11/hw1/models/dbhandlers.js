const Sequelize = require('sequelize')
const DB = require('./db')
const crypto = require('crypto')

module.exports = {
    //A. 註冊新會員
    newRegister: function(u_email, u_password, u_nickname){
        const tableName = 'yuchun33_Users'
        const u_time = new Date().toLocaleString()//無法自動產生時間
        //密碼轉暗碼
        let md5 = crypto.createHash('md5')
        let md5_password = md5.update(u_password, 'utf8').digest('hex'); 

        return DB.db.query(`INSERT INTO ${tableName} (email, password, nickname, createdAt) VALUES(:email, :password, :nickname, :time)`,
        {replacements: {email: u_email, password: md5_password, nickname: u_nickname, time: u_time}, type: Sequelize.QueryTypes.INSERT}
        )
    },
    //B. 搜尋使用者
    findUserByEmail: function(u_email){
        return DB.Users.findOne({where: {email: u_email}})
    },
    //C. 新增留言
    createComment: function(u_content, u_parent, u_nickname, u_createdAt){
        return DB.Comments.build({
            comment: u_content,
            parent: u_parent,
            nickname: u_nickname,
            createdAt: u_createdAt
        })
        .save()
    },
    //D. 拿留言
    getComments: function(){
        return DB.Comments.findAll({
            attribute: ['nickname', 'comment', 'createdAt'],
            //where: {parent: 0},
            order: [['createdAt', 'DESC']],
            raw: true
        })
    },
    //E. 刪除留言
    deleteCommenthandler: function(deleteId){       
        DB.Comments.destroy({where: {[Sequelize.Op.or]: {id: deleteId, parent: deleteId}}})  
        .then(()=>{
            console.log('delete successfully');
        })
    },
    //F. 更新留言
    updateCommenthandler: function(updateId, updateComment){
        DB.Comments.update(
            {comment: updateComment},
            {where:{id: updateId}}
        ).then(()=>{
            console.log('update successfully');
        })        
    }
}