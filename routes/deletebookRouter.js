var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');


var users = require('../models/users');

router.use(bodyParser.json());


router.get('/', (req, res, next) => {


    res.render('deletebook');


});

router.post('/', (req, res, next) => {
    console.log(req.body.bookid);
    var id=req.body.bookid;

    users.findOne({email:req.session.currentUser.email})
        .then((user1) => {
            console.log(user1.email);
            var bookCheck= user1.bookCollection.id(id); 
            if (bookCheck){
                        //console.log(bookCheck);
                        user1.bookCollection.pull({ _id:id});
                        
                        user1.bookcount = user1.bookcount - 1;

                    
                                if(bookCheck.availableAs=='softcopy'){
                                    user1.softcopycount=user1.softcopycount-1;
                                } 
                                else if (bookCheck.availableAs=='hardcopy'){
                                    user1.softcopycount=user1.softcopycount-1;
                                }

                        user1.save()

                            .then((successuser) => {
                                req.session.currentUser = user1;
                                console.log(id)
                                //console.log(req.session.currentUser.bookCollection);

                                res.render('index', {
                                    title: "Book successfully deleted",
                                    route: "profile"
                                });

                        })
                        .catch((err) => {
                            next(err)
                        });
                    }
            else{
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
module.exports = router;
