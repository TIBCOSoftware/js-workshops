'use strict';

require('dotenv').config();
var Logger = require('./util/logger');
const express = require('express')
const app = express()
const port = process.env.HTTP_PORT

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('pages/index',{
        uriPath : process.env.URIPATH,
        jrs : process.env.JRS
    });
});

// extra stuff
app.use(express.static('public'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// Log Hello World
// Logger.log(Logger.LOG_INFO, 'Hello World')

// Get the HTTP port number
// const httpport = process.env.HTTP_PORT
// Logger.log(Logger.LOG_INFO, httpport)


