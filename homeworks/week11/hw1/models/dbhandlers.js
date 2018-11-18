const Sequelize = require('sequelize')
const DB = require('./db')
const crypto = require('crypto')

module.exports = {
    //A. 初始化 DB
    initDB: (req, res)=>{
        DB.authenticatedb()
        DB.createUsersTable()
        DB.createCommentsTable()
    },
    //B. 註冊新會員
    newRegister: function(u_email, u_password, u_nickname){
        const tableName = 'yuchun33_Users'
        const u_time = new Date().toLocaleString()//無法自動產生時間
        //密碼轉暗碼
        let md5 = crypto.createHash('md5')
        let md5_password = md5.update(u_password, 'utf8').digest('hex'); 

        return DB.db().query(`INSERT INTO ${tableName} (email, password, nickname, createdAt) VALUES(:email, :password, :nickname, :time)`,
        {replacements: {email: u_email, password: md5_password, nickname: u_nickname, time: u_time}, type: Sequelize.QueryTypes.INSERT}
        )
    },
    //C. 確認有使用者
    existUser: function(u_email){
        return DB.getAndCreateUsersTable().findOne({where: {email: u_email}})
    },
    //D. 確認帳密正確
    getUserPassword: function(u_email){
        const tableName = 'yuchun33_Users'
        return DB.db().query(`SELECT password FROM ${tableName} WHERE email=:email`,
            { replacements: {email: u_email}, type: Sequelize.QueryTypes.SELECT}
            )
    },
    //E. 新增留言
    createComment: function(u_content, u_parent, u_nickname, u_createdAt){
        return DB.getAndCreateCommentsTable().build({
            comment: u_content,
            parent: u_parent,
            nickname: u_nickname,
            createdAt: u_createdAt
        })
        .save()
    },
    //F. 拿留言
    getComments: function(){
        return DB.getAndCreateCommentsTable().findAll({
            attribute: ['nickname', 'comment', 'createdAt'],
            //where: {parent: 0},
            order: [['createdAt', 'DESC']],
            raw: true
        })
    },
    //G. 搜尋使用者
    getUserNickname: function(u_email){
        const tableName = 'yuchun33_Users'
        return DB.db().query(`SELECT nickname FROM ${tableName} WHERE email=:email`,
            { replacements: {email: u_email}, type: Sequelize.QueryTypes.SELECT}
            )
    },
    //H. 刪除留言
    deleteCommenthandler: function(deleteId){        
        const tableName = 'yuchun33_Comments'
        DB.db().query(`DELETE FROM ${tableName} WHERE id=:id or parent=:parent`,
            { replacements: {id: deleteId, parent: deleteId}, type: Sequelize.QueryTypes.DELETE}
            ).then(()=>{
                console.log('delete successfully');
            })
    },
    //I. 更新留言
    updateCommenthandler: function(updateId, updateComment){
        const tableName = 'yuchun33_Comments'
        DB.db().query(`UPDATE ${tableName} SET comment=:comment WHERE id=:id`,
            { replacements: {comment: updateComment, id: updateId}, type: Sequelize.QueryTypes.UPDATE}
            ).then(()=>{
                console.log('update successfully');
            })        
    }
}