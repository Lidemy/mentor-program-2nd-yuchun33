const db = require('../models/dbhandlers')
module.exports = {
    createComments: function(req, res){
        u_content = req.body.content
        u_parent = req.body.parent
        u_nickname = req.session.nickname
        u_createdAt = new Date().toLocaleString()
        db.createComment(u_content, u_parent, u_nickname, u_createdAt)
        .then((result)=>{
            res.json({
                id: result.id,
                createdAt: result.createdAt
            })
        })
        
        
    },
    updateComments: function(req, res){
        u_updateComment = req.body.updateComment
        u_updateId = req.body.updateId
        db.updateCommenthandler(u_updateId, u_updateComment)
    },
    deleteComments: function(req, res){
        u_deleteId = req.body.deleteId
        db.deleteCommenthandler(u_deleteId)
    }
}