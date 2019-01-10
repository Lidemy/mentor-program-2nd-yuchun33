const sequelize = require('sequelize')
const dbinfo = require('./dbinfo')
module.exports = {
    db: function(){
        return new sequelize(dbinfo.database, dbinfo.username, dbinfo.password,{
            host: dbinfo.host,
            dialect: 'mysql'
        })
    },
    createURLtb: function(){
        const URLtb = this.db().define('URLtb',{
            id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            longURL:{type: sequelize.STRING, unique:true},
            shortURL:{type: sequelize.STRING, unique:true}
        },{
            tableName: 'yuchun33_URLdb'
        })
        URLtb.sync().then(()=>{
            console.log('create URLtb successfully');
        })
        return URLtb
    },
    getURLtb: function(){
        return this.db().models.URLtb
    }

}
