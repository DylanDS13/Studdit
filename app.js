const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://Admin:Admin123@ds119374.mlab.com:19374/studdit_db');
mongoose.set('debug', true);

const UserController = require('./routes/user_controller');
app.use('/users', UserController);

const ThreadController = require('./routes/thread_controller');
app.use('/threads', ThreadController);

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

const server = app.listen( process.env.PORT || 3000, function(){
    console.log('Listening on port ' + server.address().port);
});