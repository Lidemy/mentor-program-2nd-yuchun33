const Sequelize = require('sequelize')


module.exports = {
    //連接資料庫
    db: function(){
        const sequelize = new Sequelize('dbname','username','password',{
            host: 'domain',
            dialect: 'mysql'
        })
        return sequelize
    },    
    //關掉資料庫（好像沒用到）
    closedb: function(){
        db.close()
    },
    //確認連線成功
    authenticatedb: function(){
        this.db().authenticate()
            .then(()=>{
                console.log('Connection has been estiblished successfully');
            })
            .catch(err=>{
                console.error('Unable to connect to the database:', err); 
            })
    },
    //帳戶 table
    getAndCreateUsersTable: function(){
        const Users = this.db().define('yuchun33_Users', {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            email: {type: Sequelize.STRING, unique:true},
            password: {type: Sequelize.STRING},
            nickname: {type: Sequelize.STRING, unique:true},
            createdAt: {type: Sequelize.DATE}
        }, {
            timestamps: false
        })
        Users.sync().then(()=>{
            console.log('Create UsersTable successfully');
        }).catch(err=>{
            console.error('Unable to connect to the database:', err); 
        })
        return Users //Q:怎麼獨立出來拿
    },
    //留言板 table
    getAndCreateCommentsTable: function(){
        const Comments = this.db().define('yuchun33_Comments', {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            nickname:{type: Sequelize.STRING},
            comment:{type: Sequelize.TEXT},
            parent:{type: Sequelize.TEXT},
            createdAt: {type: Sequelize.DATE}
        }, {
            timestamps: false
        })
        Comments.sync().then(()=>{
            console.log('Create CommentsTable successfully');
        }).catch(err=>{
            console.error('Unable to connect to the database:', err); 
        })
        return Comments
    }

}


