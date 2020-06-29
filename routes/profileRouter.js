var express = require('express');
var router = express.Router();
var path = require('path');



var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var users = require('../models/users');
var books = require('../models/books');


router.use(bodyParser.json());


router.get('/', (req, res, next) => {
    if (req.session.user) {
        //console.log(req.session.user)
         users.findById(req.session.currentUser._id).populate({path:"bookCollection"})
         .then((user)=>{
             userbooks=user.bookCollection
             bookscount=user.bookcount
            // console.log(user)
             //console.log(userbooks[0].owner);
             res.render('profile', {
                userbooks: userbooks,
                user: user,
                bookcount: bookscount
            });


         })
         .catch((err)=>{
             next(err)
         })
        // var userbooks = req.session.currentUser.bookCollection;
        // var bookscount = req.session.currentUser.bookcount;
        // var currentuser = req.session.currentUser;
        // usersbooks=user.bookCollection
        // bookscount=user.bookcount
        // console.log(userbooks)
        // console.log(userbooks[0].owner);

        // res.render('profile', {
        //     userbooks: userbooks,
        //     user: currentuser,
        //     bookcount: bookscount
        // });


    } else {
        res.render('index', {
            title: "Please login to proceed further",
            route: "login"
        });

    }


});


module.exports = router;