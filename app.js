var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var socketIo = require('socket.io');


var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var userInscriptionRouter = require('./routes/user/inscription');
var userConnexionRouter = require('./routes/user/connexion');
var userDashboardRouter = require('./routes/user/dashboard');
var confAddRouter = require('./routes/conf/add');
var confInsciRouter = require('./routes/conf/inscription_conf');
var chatChoixRouter = require('./routes/chat/choixuser');
var chatChatRouter = require('./routes/chat/chat')(io);
var app = express();


var io = socketIo();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/user/inscription', userInscriptionRouter);
app.use('/user/connexion', userConnexionRouter);
app.use('/user/dashboard', userDashboardRouter);
app.use('/conf/add', confAddRouter);
app.use('/conf/inscription_conf',confInsciRouter);
app.use('/chat/choixuser',chatChoixRouter);
app.use('/chat/chat', chatChatRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
