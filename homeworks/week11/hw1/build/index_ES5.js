'use strict';

var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var loginController = require('./controllers/loginController');
var registerController = require('./controllers/registerController');
var commentsController = require('./controllers/commentsController');
var db = require('./models/dbhandlers');

var options = {
    host: "166.62.28.131",
    user: "student2nd",
    password: "mentorstudent123",
    database: "mentor_program_db"
};

var session = require('express-session');
var SessionStore = require('express-mysql-session');
var sessionStore = new SessionStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    schema: {
        tableName: 'yuchun33_sessions'
    }
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false })); //????
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', loginController.loginPage);
app.post('/login', loginController.loginHandler);
app.get('/register', registerController.registerPage);
app.post('/register', registerController.registerHandler);
app.get('/comments', function (req, res) {
    db.getComments(req, res).then(function (dbresult) {
        res.render('main', { user: req.session.nickname || '', result: dbresult });
    });
});
app.post('/createComment', commentsController.createComments);
app.post('/updateComment', commentsController.updateComments);
app.get('/deleteComment', commentsController.deleteComments);
app.post('/deleteComment', commentsController.deleteComments);
app.get('/logout', loginController.logoutHandler);
app.listen(port);