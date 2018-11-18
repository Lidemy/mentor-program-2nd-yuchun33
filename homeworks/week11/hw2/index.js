const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const URLController = require('./URLController.js')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.render('index', {shortURL: 'null'})
})
app.post('/search', URLController.URL)
app.get('/s/:u_shortURL', URLController.redirect2Long)

app.listen(port)