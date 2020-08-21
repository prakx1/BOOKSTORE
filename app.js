const createError = require('http-errors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//middlewares
const auth = require('./middlewares/auth');

//Routes
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signupRouter');
const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');
const homeRouter = require('./routes/homeRouter');
const addBookRouter = require('./routes/addBookRouter');
const profileRouter = require('./routes/profileRouter');
const helpRouter = require('./routes/helpRouter');
const aboutRouter = require('./routes/aboutRouter');
const updateprofileRouter = require('./routes/updateprofileRouter');
const deletebookRouter = require('./routes/deletebookRouter');
const updatebookRouter = require('./routes/updatebookRouter');
const searchRouter = require('./routes/searchRouter');
const bookownerRouter = require('./routes/bookownerRouter')
const confirmationRouter = require('./routes/confirmationRouter')
const resendRouter = require('./routes/resendRouter');

//session requirements
const session = require('express-session');
const FileStore = require('session-file-store')(session);
//session requirements end

const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');



const url = 'mongodb://localhost:27017/booktest';

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((db) => {
        console.log("connected to server");
    })
    .catch((err) => {
        console.log(err + "cant connect");
    });




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
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
app.use('*', (req, res, next) => {
    app.locals.login = req.session.user;
    next()
})


app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/help', helpRouter);
app.use('/about', aboutRouter);
app.use('/search', searchRouter);
app.use('/owner', bookownerRouter)
//email verification

app.use('/confirmation', confirmationRouter);
app.use('/resend/', resendRouter);



app.use(auth);

//Protected routes
app.use('/add', addBookRouter);
app.use('/profile', profileRouter);
app.use('/updateprofile', updateprofileRouter);
app.use('/deletebook', deletebookRouter);
app.use('/updatebook', updatebookRouter);



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
    console.log(err.message);
    res.render('index', {
        title: "error occured",
        route: '/'
    });
});

module.exports = app;