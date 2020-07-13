var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');


var users = require('../models/users');
const books = require('../models/books');

router.use(bodyParser.json());


router.route('/:bookid')
    .get((req, res, next) => {
        console.log("fuck");


        var id = req.params.bookid;

        users.findOne({ email: req.session.currentUser.email })
            .then((user1) => {
                console.log(user1.email);
                var bookCheck = user1.bookCollection.includes(id);
                console.log(bookCheck)
                if (bookCheck) {
                    books.findByIdAndDelete(id)
                        .then((deleted) => {
                            //Pulling the (removing) the id from bookcOLLECTION ARRAY
                            user1.bookCollection.pull(id);
                            user1.bookcount = user1.bookcount - 1;
                            user1.save()
                                .then((successuser) => {
                                    req.session.currentUser = user1;
                                    res.redirect('/profile')
                                })
                                .catch((err) => {
                                    next(err)
                                });
                        })

                } else {
                    console.log('BOOK NOT FOUND!!!')
                    res.render('index', {
                        title: "Book Not found",
                        route: "profile"
                    });
                }

            })
            .catch((err) => {
                next(err)
            });



    });









/*
router.post('/', (req, res, next) => {
    
    var id = req.params.bookid;

    users.findOne({ email: req.session.currentUser.email })
        .then((user1) => {
            console.log(user1.email);
            var bookCheck = user1.bookCollection.includes(bookid);
            console.log(bookCheck)
            if (bookCheck) {
                books.findByIdAndDelete(bookid)
                    .then((deleted) => {
                        //Pulling the (removing) the id from bookcOLLECTION ARRAY
                        user1.bookCollection.pull(bookid);
                        user1.bookcount = user1.bookcount - 1;
                        user1.save()
                            .then((successuser) => {
                                req.session.currentUser = user1;
                                res.render('index', {
                                    title: "Book successfully deleted",
                                    route: "profile"
                                });
                            })
                            .catch((err) => {
                                next(err)
                            });
                    })

            } else {
                console.log('BOOK NOT FOUND!!!')
                res.render('index', {
                    title: "Book Not found",
                    route: "profile"
                });
            }

        })
        .catch((err) => {
            next(err)
        });
});

*/
module.exports = router;