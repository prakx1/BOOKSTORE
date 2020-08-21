var express = require('express');
var router = express.Router();

var token = require('../models/token')
var user = require('../models/users');

router.get(('/:tokenid'), (req, res, next) => {
    tokenId = req.params.tokenid;
    console.log(tokenId)
    token.findOne({
            token: tokenId
        })
        .then((tokenD) => {
            console.log(tokenD)
            if (!tokenD) {
                res.status(400);
                res.send('Invalid Token')
            } else {
                user.findById(tokenD.user, 'isVerified')
                    .then((user1) => {
                        console.log(user1)
                        if (!user1) {
                            res.status(400)
                            res.send("User not found")
                        } else {
                            user1.isVerified = true;
                            user1.save()
                                .then((done) => {
                                    res.status(200)
                                    res.send('Your account is verified')
                                })
                                .catch((err) => {
                                    res.send("cant save")
                                })
                        }

                    })
                    .catch((err) => (
                        res.send({
                            msg: err.message
                        })
                    ))
            }
        })
        .catch((err) => {
            res.send({
                msg: err.message
            })
        })
})
module.exports = router