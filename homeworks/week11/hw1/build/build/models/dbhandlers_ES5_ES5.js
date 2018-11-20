'use strict';

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

var Sequelize = require('sequelize');
var DB = require('./db');
var crypto = require('crypto');

module.exports = {
    //B. 註冊新會員
    newRegister: function newRegister(u_email, u_password, u_nickname) {
        var tableName = 'yuchun33_Users';
        var u_time = new Date().toLocaleString(); //無法自動產生時間
        //密碼轉暗碼
        var md5 = crypto.createHash('md5');
        var md5_password = md5.update(u_password, 'utf8').digest('hex');

        return DB.db.query('INSERT INTO ' + tableName + ' (email, password, nickname, createdAt) VALUES(:email, :password, :nickname, :time)', { replacements: { email: u_email, password: md5_password, nickname: u_nickname, time: u_time }, type: Sequelize.QueryTypes.INSERT });
    },
    //C. 確認有使用者
    findUserByEmail: function findUserByEmail(u_email) {
        return DB.Users.findOne({ where: { email: u_email } });
    },
    //E. 新增留言
    createComment: function createComment(u_content, u_parent, u_nickname, u_createdAt) {
        return DB.Comments.build({
            comment: u_content,
            parent: u_parent,
            nickname: u_nickname,
            createdAt: u_createdAt
        }).save();
    },
    //F. 拿留言
    getComments: function getComments() {
        return DB.Comments.findAll({
            attribute: ['nickname', 'comment', 'createdAt'],
            //where: {parent: 0},
            order: [['createdAt', 'DESC']],
            raw: true
        });
    },
    //H. 刪除留言
    deleteCommenthandler: function deleteCommenthandler(deleteId) {
        DB.Comments.destroy({ where: _defineProperty({}, Sequelize.Op.or, { id: deleteId, parent: deleteId }) }).then(function () {
            console.log('delete successfully');
        });
    },
    //I. 更新留言
    updateCommenthandler: function updateCommenthandler(updateId, updateComment) {
        DB.Comments.update({ comment: updateComment }, { where: { id: updateId } }).then(function () {
            console.log('update successfully');
        });
    }
};