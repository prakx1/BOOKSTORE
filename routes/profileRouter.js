var express = require('express');
var router = express.Router();
var path = require('path');



var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var users = require('../models/users');

router.use(bodyParser.json());



router.get('/', (req, res, next) => {
    let login =req.session.user;
    if (req.session.user) {
        var books = req.session.currentUser.bookCollection;
        var bookscount = req.session.currentUser.bookcount;
        var currentuser = req.session.currentUser;

        console.log(bookscount);


        res.render('profile', {
            login:login,
            userbooks: books,
            user: currentuser,
            bookcount: bookscount
        });


    } else {
        res.render('index', {
            title: "Please login to proceed further",
            route: "login"
        });

    }


});


module.exports = router;