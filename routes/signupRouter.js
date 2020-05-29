var express = require('express');
var router = express.Router();
var path = require('path');







var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var users = require('../models/users');

router.use(bodyParser.json());





router.get('/', (req, res, next) => {

    if (!req.session.user) {

        res.render('signup.ejs');
    } else {
        res.render('index', {
            title: "You are already logged in . Not allowed to signup",
            route: "/"
        });

    }

});


router.post('/', (req, res, next) => {

    if (req.body.password1 === req.body.password2) {

        users.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    users.create({ email: req.body.email, password: req.body.password1, username: req.body.username })
                        .then((user1) => {
                            console.log("user created");
                            res.render('index', {
                                title: "Successfully signed up !",
                                route: "/"

                            });





                        })
                        .catch((err) => {
                            next(err);
                        });


                } else {
                    console.log("user exist");
                    res.render('index', {
                        title: "User  already exists",
                        route: "signup"
                    });

                }


            })
            .catch((err) => {
                next(err);
            });

    } else {
        console.log("please retype password")
        res.render('index', {
            title: "Password doesn't match",
            route: "signup"
        });







    }










});





module.exports = router;