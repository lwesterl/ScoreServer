const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const scoresRouter = require('./routes/scores');
const levelsRouter = require('./routes/levels');
const gameModesRouter = require('./routes/game_modes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/scores', scoresRouter);
app.use('/api/levels', levelsRouter);
app.use('/api/game_modes', gameModesRouter);

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

// simple rate limiter
app.set('trust proxy', 1);
const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000, // 15 mins
  max: 500 // limit to 500 request per ip in windowsMs time period
});
app.use(limiter);

module.exports = app;
