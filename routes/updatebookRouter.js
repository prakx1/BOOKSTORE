var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');


var users = require('../models/users');

router.use(bodyParser.json());




router.get('/', (req, res, next) => {

    res.render('updatebook');


});


router.post('/', (req, res, next) => {
    console.log(req.body.bookid);
    users.updateOne({}, {
            $pull: {
                'bookCollection': {
                    'title': 'dsad'
                }
            }
        })
        .then((user1) => {
            res.render('index', {
                title: "Book successfully deleted",
                route: "profile"
            });
            console.log("yash1" + user1);


        })
        .catch((err) => {
            next(err);

        });
});





module.exports = router;