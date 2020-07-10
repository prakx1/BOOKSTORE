var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var users = require('../models/users');
var books = require('../models/books');

router.use(bodyParser.json());
router.get('/', (req, res, next) => {
    let login =req.session.user;
    if (req.session.user) {
         //Populating the user with the books collection.
         console.log(req.session.currentUser.bookCollection)
         users.findById(req.session.currentUser._id).populate({path:"bookCollection"})
            .then((user)=>{
                userbooks=user.bookCollection
                bookscount=user.bookcount
                res.render('profile', {
                    userbooks: userbooks,
                    user: user,
                    bookcount: bookscount
                });
            })

            .catch((err)=>{
                next(err)
                })
    }
     
    else {
        res.render('index', {
            title: "Please login to proceed further",
            route: "login"
        });

    }


});


module.exports = router;