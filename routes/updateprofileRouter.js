var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var multer = require('multer');

var users = require('../models/users');

router.use(bodyParser.json());



var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: Storage

}).single('profileimg');



router.get('/', (req, res, next) => {
    var currentuser = req.session.currentUser;
    console.log(currentuser.username);
    res.render('updateprofile', {
        username: currentuser.username,
        useremail: currentuser.email,
        usergender: currentuser.gender,


    });


});


router.post('/', upload, (req, res, next) => {
    users.findOne({
            email: req.body.email,
            username: req.body.username
        })
        .then((user1) => {
            try {
                var imageurl1 = req.file.filename;
                user1.profileurl = imageurl1;


            } catch (e) {
                console.log(e);

            } finally {
                console.log(user1.profileurl);
            }
            user1.username = req.body.username;
            user1.email = req.body.email;
            user1.gender = req.body.gender;
            user1.save()
                .then((successuser) => {
                    req.session.currentUser = successuser;


                    res.render('index', {
                        title: "Profile successfully updated",
                        route: "profile"
                    });
                })
                .catch((err) => {
                    next(err)
                });





        })
        .catch((err) => {
            next(err);
        })


});





module.exports = router;
