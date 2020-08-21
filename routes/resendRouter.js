const express = require('express');
const token = require('../models/token');
const user = require('../models/users');
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const users = require('../models/users');
const router = express.Router();



router.get('/:emailId', (req, res, next) => {
    console.log(req.params.headers)
    console.log(req.params)
    var emailId = req.params.emailId;
    users.findOne({
            email: emailId
        }, 'isVerified email')
        .then((user1) => {
            console.log(user1)
            if (!user1) { //User is not registered
                res.status(401);
                res.send('Email is not valid')
            } else if (user.isVerified == true) { //User is already verified
                res.status(201);
                res.send("Already verified")
            } else { //Request is valid , send code.
                token.create({
                        user: user1._id,
                        token: crypto.randomBytes(16).toString('hex')
                    })
                    .then((token) => {
                        console.log('token Genrated');
                        console.log(user1.email)
                        const transporter = nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'prakx2050@gmail.com',
                                pass: 'TERABAAPHU101'
                            }
                        });
                        const mailOptions = {
                            from: 'prakx2050@gmail.com',
                            to: user1.email,
                            subject: 'Account Verification Token',
                            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'
                        };
                        transporter.sendMail(mailOptions, function (err) {
                            if (err) {
                                return res.status(500).send({
                                    msg: err.message
                                });
                            }
                            res.status(200).send('A verification email has been sent to ' + user1.email + '.');
                        });
                    })
                    .catch((err) => {
                        next(err)
                    })
            }
        })
        .catch((err) => {
            next(err)
        })
})
module.exports = router;