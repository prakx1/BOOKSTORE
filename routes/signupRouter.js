const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("../models/users");
const token = require("../models/token");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

router.use(bodyParser.json());

router.get("/", (req, res, next) => {
  if (!req.session.user) {
    res.render("signup.ejs");
  } else {
    res.render("index", {
      title: "You are already logged in . Not allowed to signup",
      route: "/",
    });
  }
});

router.post("/", (req, res, next) => {
  if (req.body.password1 === req.body.password2) {
    users
      .findOne({
        email: req.body.email,
      })
      .then((user) => {
        if (!user) {
          users
            .create({
              email: req.body.email,
              password: req.body.password1,
              username: req.body.username,
            })
            .then((user1) => {
              console.log("UserCreated");
              //EMAIL VERIFICATION --------------ON HOLD-----------------
              // token.create({
              //         user: user1._id,
              //         token: crypto.randomBytes(16).toString('hex')
              //     })
              //     .then((token) => {
              //         console.log('token Genrated');
              //         console.log(user1.email)
              //         const transporter = nodemailer.createTransport({
              //             service: 'Gmail',
              //             auth: {
              //                 user: 'prakx2050@gmail.com',
              //                 pass: 'TERABAAPHU101'
              //             }
              //         });
              //         const mailOptions = {
              //             from: 'p2050@gmail.com',
              //             to: user1.email,
              //             subject: 'Account Verification Token',
              //             text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'
              //         };
              //         transporter.sendMail(mailOptions, function (err) {
              //             if (err) {
              //                 return res.status(500).send({
              //                     msg: err.message
              //                 });
              //             }
              //             res.status(200).send('A verification email has been sent to ' + user1.email + '.');
              //         });
              //     })
              // .catch((err) => {
              //   next(err);
              // });
              res.render("Login", {
                title: "Successfully Created Log in into account!!",
                route: "/",
              });
            })
            .catch((err) => {
              next(err);
            });
        } else {
          console.log("user exist");
          res.render("index", {
            title: "User  already exists",
            route: "signup",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    console.log("please retype password");
    res.render("index", {
      title: "Password doesn't match",
      route: "signup",
      layout: false,
    });
  }
});

module.exports = router;
