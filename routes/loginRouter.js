var express = require('express');
var router = express.Router();
var path = require('path');



var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var users = require('../models/users');

router.use(bodyParser.json());



router.get('/', (req, res, next) => {
    if (!req.session.user) {
        res.render('login.ejs');
    } else {
        res.render('index', {
            title: "You are already logged in !!!",
            route: "home"
        });

    }


});


router.post('/', (req, res, next) => {

    users.findOne({ email: req.body.email, password: req.body.password })
        .then((user1) => {
            if (!user1) {
                console.log("user doesnt exist");
                res.render('index', {
                    title: "User doesnOt exist",
                    route: "login"
                });

            } else {
                console.log("user exist");
                req.session.user = 'authenticated';
                req.session.currentUser = user1;
                //users.findById(currentUser._id).populate('books')
                res.render('index', {
                    title: "You are successfully logged in !!!",
                    route: "/"
                });

            }


        })
        .catch((err) => {
            next(err);
        });

});



module.exports = router;