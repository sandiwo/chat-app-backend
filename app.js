require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jsonFormat = require('./middleware/jsonFormat');
var auth = require('./middleware/auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UsersRoute');
var authRouter = require('./routes/AuthRoute');
var messagesRouter = require('./routes/MessagesRoute');
var avatarRouter = require('./routes/AvatarRoute');

var cors = require('cors');

require('./config/passport');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/public/images/avatars'));
app.use(express.static(__dirname + '/public/images/message_files'));

app.use(jsonFormat.jsonData);
app.use(jsonFormat.jsonStatus);
app.use(jsonFormat.jsonError);
app.use(auth.auth);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/messages', messagesRouter);
app.use('/avatar', avatarRouter);

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
  res.jsonData(err.status || 500, "Global Error.", err.message);
});

module.exports = app;
