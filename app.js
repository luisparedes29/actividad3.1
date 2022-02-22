var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session= require('express-session');

var indexRouter = require('./routes/index');
var indexControllersRouter = require('./routes/controllers/empresa/index');

var app = express();


app.use(session({
    secret:'123456',
    resave:true,
    saveUninitialized:true 
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', indexControllersRouter);

module.exports = app;
