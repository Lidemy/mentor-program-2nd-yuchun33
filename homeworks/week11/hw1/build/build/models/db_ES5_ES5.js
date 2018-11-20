'use strict';

var _module$exports;

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

var Sequelize = require('sequelize');
var db = new Sequelize('mentor_program_db', 'student2nd', 'mentorstudent123', {
    host: '166.62.28.131',
    dialect: 'mysql'
});

db.authenticate().then(function () {
    console.log('Connection has been estiblished successfully');
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});

var Users = db.define('yuchun33_Users', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
    nickname: { type: Sequelize.STRING, unique: true },
    createdAt: { type: Sequelize.DATE }
}, {
    timestamps: false
});

Users.sync().then(function () {
    console.log('Create UsersTable successfully');
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});

var Comments = db.define('yuchun33_Comments', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: Sequelize.STRING },
    comment: { type: Sequelize.TEXT },
    parent: { type: Sequelize.TEXT },
    createdAt: { type: Sequelize.DATE }
}, {
    timestamps: false
});
Comments.sync().then(function () {
    console.log('Create CommentsTable successfully');
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});

module.exports = (_module$exports = {
    db: db }, _defineProperty(_module$exports, 'db', db), _defineProperty(_module$exports, 'Users', Users), _defineProperty(_module$exports, 'Comments', Comments), _module$exports);