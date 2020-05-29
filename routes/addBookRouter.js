var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');




var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var users = require('../models/users');

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

});



router.get('/', (req, res, next) => {
    if (req.session.user) {
        res.render('addBook');

    } else {
        res.render('index', {
            title: "Please login to proceed further",
            route: "login"
        });

    }


});

router.post('/', upload.fields([{ name: 'bookimg', maxCount: 1 }, { name: 'bookcopys', maxCount: 1 }]), (req, res, next) => {

    users.findOne({ email: req.session.currentUser.email, password: req.session.currentUser.password })
        .then((user1) => {
            if (!user1) {
                console.log("user doesnt exits");
                res.render('index', {
                    title: "User doesn't exits",
                    route: "add"
                });

            } else {
                var book = {
                    title: req.body.title,
                    author: req.body.author,
                    publisher: req.body.publisher,
                    desc: req.body.description,
                    availableAs: req.body.availableAs,
                    price: req.body.bookPrice,
                    category: req.body.category
                }


                try {
                    var imageurl1 = req.files.bookimg[0].filename;
                    book.imageurl = imageurl1;


                } catch (e) {
                    console.log("error in bookimage");

                }

                try {
                    var bookurl1 = req.files.bookcopys[0].filename;
                    book.bookurl = bookurl1;
                    book.softcopy_available = 1;


                } catch (e) {
                    console.log("error in bookurl");

                } finally {
                    console.log(book);
                }


                if (req.body.availableAs == "softcopy") {
                    console.log(req.body.availableAs)
                    user1.softcopycount = user1.softcopycount + 1;
                } else {
                    user1.hardcopycount = user1.hardcopycount + 1;

                }


                user1.bookCollection.push(book);
                user1.bookcount = user1.bookcount + 1;
                user1.save()
                    .then((successuser) => {
                        req.session.currentUser = user1;
                        console.log(req.session.currentUser.bookCollection);

                        res.render('index', {
                            title: "Book successfully created",
                            route: "profile"
                        });
                    })
                    .catch((err) => {
                        next(err)
                    });





            }


        })
        .catch((err) => {
            next(err);
        });

});



module.exports = router;

module.exports = router;