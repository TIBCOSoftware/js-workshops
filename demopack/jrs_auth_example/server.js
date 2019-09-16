// server.js
// load the things we need
const express = require('express');
const app = express();
var User = require('./model/user');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Routes //
// login page 
app.get('/', function(req, res) {
    res.render('pages/login');
});
app.get('/login', function(req, res) {
    res.render('pages/login');
});

// home page 
app.get('/home', function(req, res) {
    res.render('pages/home');
});

// login post 
app.post('/login', function(req, res){
    var userInfo = {
        username : req.body.username,
        password : req.body.password
    }

    var validate = User.validatePassword(userInfo);

    if (validate == "no_user_found"){
        res.render('pages/login');
    }else if (validate == "password_mismatch"){
        res.render('pages/login');
    }else{
        let user = User.search(userInfo);
        res.redirect('/home?token=' + User.createToken(user));
    }
});

// start up the server on specific port
const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});