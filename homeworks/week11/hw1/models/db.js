const Sequelize = require('sequelize')
// 定義 db
const db = new Sequelize('','','',{
    host: '',
    dialect: 'mysql'
})
// 連線 db
db.authenticate()
    .then(()=>{
        console.log('Connection has been estiblished successfully');
    })
    .catch(err=>{
        console.error('Unable to connect to the database:', err); 
    })
// 定義 Users 表格
const Users = db.define('yuchun33_Users', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: Sequelize.STRING, unique:true},
        password: {type: Sequelize.STRING},
        nickname: {type: Sequelize.STRING, unique:true},
        createdAt: {type: Sequelize.DATE}
    }, {
        timestamps: false
    })
// 建立 Users 表格
Users.sync().then(()=>{
    console.log('Create UsersTable successfully');
}).catch(err=>{
    console.error('Unable to connect to the database:', err); 
})
// 定義 Comments 表格
const Comments = db.define('yuchun33_Comments', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nickname:{type: Sequelize.STRING},
        comment:{type: Sequelize.TEXT},
        parent:{type: Sequelize.TEXT},
        createdAt: {type: Sequelize.DATE}
    }, {
        timestamps: false
    })
// 建立 Comments 表格
Comments.sync().then(()=>{
    console.log('Create CommentsTable successfully');
}).catch(err=>{
    console.error('Unable to connect to the database:', err); 
})

module.exports = {
    db, db,
    Users: Users,
    Comments: Comments
}




