const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const index = require('./routes/index');
const steam = require('./routes/steam');

const app = express();

//database connection
const db = require ('./helper/db.js')(); //sondaki () export modülündeki call-back fonskiyonu çalıstırmak için

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//bodyparser sayesinde post metodundan döneni direkt obje olarak kullanabiliyoruz

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index); //routes index.js
app.use('/api/steam', steam); //routes steam.js

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err.message}); //hatayi json olarak göndermek için
});

module.exports = app;
