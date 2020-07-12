var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var multer = require('multer');


var users = require('../models/users');
const books = require('../models/books');


router.use(bodyParser.json());


var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: Storage

}).single('bookimage');




router.route('/:bookid')
    .get((req, res, next) => {
        console.log(req.params.bookid + "fuck");


        books.findById(req.params.bookid)
            .then((book) => {

                if (book != null) {

                    res.render('updatebook', {
                        Book: book
                    });

                } else {

                }
            })
            .catch((err) => {
                next(err)
            });

    })
    .post(upload, (req, res, next) => {

        console.log(req.params.bookid + "fuck1");

        books.findById(req.params.bookid)
            .then((book) => {

                if (book != null) {

                    book.title = req.body.title;
                    book.author = req.body.author;
                    book.publisher = req.body.publisher;
                    book.price = req.body.price;
                    try {
                        var imageurl1 = req.file.filename;
                        book.imageurl = imageurl1;


                    } catch (e) {
                        console.log("error in bookimage");

                    } finally {
                        console.log(book.imageurl);
                    }

                    book.save()
                        .then((successbook) => {
                            res.render('index', {
                                title: "book successfully updated",
                                route: "/profile"
                            });
                        })
                        .catch((err) => {
                            next(err);
                        })


                } else {
                    console.log("book is empty")
                }
            })
            .catch((err) => {
                next(err)
            });
    });


module.exports = router;