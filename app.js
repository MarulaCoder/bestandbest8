var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var compression = require('compression');
var helmet = require('helmet');

var app = express();


// Set up mongoose connection
//var mongoose = require('mongoose');
//var dev_db_url = 'mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true'
//var mongoDB = process.env.MONGODB_URI || dev_db_url;
//mongoose.connect(mongoDB, { useNewUrlParser: true });
//mongoose.Promise = global.Promise;
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

/*
// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
});
*/

// Set the default views directory to views folder
app.set('views', path.join(__dirname, 'views'));

// setup the logger
app.use(logger('combined', { stream: accessLogStream }))
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('view engine', 'ejs');

app.use('/', indexRouter);
//app.use('/about', indexRouter);
app.use('/tweet/send', indexRouter);
app.use('/tweet/list', indexRouter);
app.use('/tweet/detail', indexRouter);
app.use('/file/upload', indexRouter);
//app.use('/users', usersRouter);
//app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

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
  res.render('error');
});

module.exports = app;
