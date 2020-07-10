var express = require('express');
var router = express.Router();
var path = require('path');
var JSAlert = require("js-alert");



var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var problems = require('../models/problems');

router.use(bodyParser.json());



router.get('/', (req, res, next) => {
    let login =req.session.user;



    res.render('help.ejs',{
        
    });


});
router.post('/', (req, res, next) => {


    if (!req.session.user) {
        res.render('index', {
            title: "Please log in to submit your query",
            route: "login"
        });
    }

    problems.create({
            desc: req.body.description,
            userEmail: req.session.currentUser.email
        })
        .then((prob) => {
            res.render('index', {
                title: "Issue successfully submitted . We will contact soon !!!",
                route: "help"
            });



        })
        .catch((err) => {
            next(err);
        })






});




module.exports = router;