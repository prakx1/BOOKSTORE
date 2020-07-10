var createError = require('http-errors');
var express = require('express');
var multer = require('multer');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');



var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signupRouter');
var loginRouter = require('./routes/loginRouter');
var logoutRouter = require('./routes/logoutRouter');
var homeRouter = require('./routes/homeRouter');
var addBookRouter = require('./routes/addBookRouter');
var profileRouter = require('./routes/profileRouter');
var helpRouter = require('./routes/helpRouter');
var aboutRouter = require('./routes/aboutRouter');
var profileRouter = require('./routes/profileRouter');
var updateprofileRouter = require('./routes/updateprofileRouter');
var deletebookRouter = require('./routes/deletebookRouter');
var updatebookRouter = require('./routes/updatebookRouter');
var searchRouter=require('./routes/searchRouter');

//session requirements
var session = require('express-session');
var FileStore = require('session-file-store')(session);
//session requirements end

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');



const url = 'mongodb://localhost:27017/booktest';

mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true})
    .then((db) => {
        console.log("connected to server");
    })
    .catch((err) => {
        console.log(err + "cant connect");
    });




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

//ADDED A GLOBAL VARIBALE login FOR ALL ROUTES 
app.use('*',(req,res,next)=>{
    app.locals.login=req.session.user;
    next()
  })

app.use('/', homeRouter);
app.use('/users', usersRouter);


app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/help', helpRouter);
app.use('/about', aboutRouter);
app.use('/search',searchRouter);


function auth(req, res, next) {
    console.log(req.session.user);
    if (!req.session.user) {
        res.render('index', {
            title: "Please log in to proceed further",
            route: "login"
        });

    } else {
        if (req.session.user === 'authenticated') {
            next();
            //user is authenticated
        } else {
            res.render('index', {
                title: "Please log in to proceed ",
                route: "login",
            
            });
        }


    }
};


app.use(auth);
app.use('/add', addBookRouter);
app.use('/profile', profileRouter);
app.use('/updateprofile', updateprofileRouter);
app.use('/deletebook', deletebookRouter);
app.use('/updatebook', updatebookRouter);













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
    console.log(err.message);
    res.render('index', {
        title: "error occured",
        route: '/'
    });
});

module.exports = app;