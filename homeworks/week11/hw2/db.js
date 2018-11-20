const sequelize = require('sequelize')
// 定義 db
const db = new sequelize('mentor_program_db','student2nd','mentorstudent123',{
    host: '166.62.28.131',
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
// 定義 URLtb 表格
const URLtb = db.define('URLtb',{
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        longURL:{type: sequelize.STRING, unique:true},
        shortURL:{type: sequelize.STRING, unique:true}
    },{
        tableName: 'yuchun33_URLdb'
    })
// 建立 URLtb 表格
URLtb.sync().then(()=>{
    console.log('create URLtb successfully');
})

module.exports = {
    db: db,
    URLtb: URLtb
}