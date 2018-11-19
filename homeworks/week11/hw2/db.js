const sequelize = require('sequelize')
module.exports = {
    db: function(){
        return new sequelize('dbname','user','password',{
            host: '',
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
