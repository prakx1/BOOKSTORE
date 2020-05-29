var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var users = require('../models/users');

router.use(bodyParser.json());



router.get('/', (req, res, next) => {

    res.render('about.ejs');



});


module.exports = router;