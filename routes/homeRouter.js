var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var users = require('../models/users');
router.use(bodyParser.json());


router.get('/', (req, res, next) => {
    let login =req.session.user;
    console.log(login);
    res.render('home.ejs');

});









module.exports = router;