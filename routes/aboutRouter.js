var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var users = require('../models/users');

router.use(bodyParser.json());



router.get('/', (req, res, next) => {
    let login =req.session.user;

    res.render('about.ejs',{
        login:login,
        layout:false
    });



});


module.exports = router;