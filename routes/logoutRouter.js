var express = require('express');
var router = express.Router();
var path = require('path');




var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var users = require('../models/users');

router.use(bodyParser.json());



router.get('/', (req, res, next) => {
    if (!req.session.user) {
        res.render('index', {
            title: "You are not logged in . Please log in",
            route: "login"
        });
    } else {
        req.session.destroy();
        res.clearCookie('session-id');
        res.render('index', {
            title: "You are successfully logged out",
            route: "/"
        });


    }


});
















module.exports = router;