const dotenv = require('dotenv'); 
const result= dotenv.config();

if (result.error)
{
    console.error("Dotenv:", result.error);
}

const socketio = require("socket.io")
const createError = require('http-errors')
const express = require('express')
const path = require('path')
//const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('cookie-session')
const passport = require('passport')
const localPassport = require('./auth/localPassport')
const cors = require("cors")

// IMPORT ROUTES
const apiRouter = require('./routes/apiRouter')


const app = express()
app.use(cors())
const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log('CanBudget server listening on port ' + port)
})

console.log("the allowed orgin is", process.env.CLIENTPORT)
const io= socketio(server, {
    cors: {
      // This is the client side
      origin: process.env.NODE_ENV === "production"? process.env.PORT: process.env.CLIENTPORT,
      methods: ["GET", "POST"]
    }})

// middleware to pass socket to each request object
// I tried to put it after the app block, it will not work for that way
app.use((req, res, next) => {
    req.io = io;
    next();
  });

io.on('connection', socket => {
    console.log('SOCKET CONNECTED');
    socket.emit("message", "data")
    socket.on('salutations', () => {
        console.log('salutations');
      });
    socket.on('disconnect', () => {
      console.log('SOCKET DISCONNECTED');
    });
  });

  app.use(cors())


app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

//app.use(session({ secret: "meow-meow"}));
app.use(session({ secret: "meow-meow", resave:false, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());



// USE ROUTES: This needs to be in front of other default routes
app.use('/api', apiRouter);

app.use(express.static((process.env.NODE_ENV === "production")? ("../client/build") : (path.join(__dirname, 'public'))))
// //  addinng this line in the deploy + refresh case, so it does not get lost when it is not started at the HomePage, this is a file path format
app.get("*", (req, res) => {res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))})
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








