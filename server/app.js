const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
//require('./auth/configurePassport')

//const cors = require("cors")


// IMPORT ROUTES
const apiRouter = require('./routes/apiRouter')
//

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(session({ secret: "cats" }));
//app.use(passport.initialize());
//app.use(passport.session());



app.use(express.static('../client/build'))
app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname,'../client/build','index.html'))
})

// USE ROUTES

app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.error("* " + err.message);
  //console.log(req);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error !!');
});

module.exports = app;
