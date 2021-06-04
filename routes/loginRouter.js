var express = require("express");
var router = express.Router();
var path = require("path");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
var users = require("../models/users");
var token = require("../models/token");
const { route } = require("./homeRouter");

router.use(bodyParser.json());

router.get("/", (req, res, next) => {
  if (!req.session.user) {
    res.render("login.ejs");
  } else {
    res.render("index", {
      title: "You are already logged in !!!",
      route: "home",
    });
  }
});

router.post("/", (req, res, next) => {
  users
    .findOne({
      email: req.body.email,
      password: req.body.password,
    })
    .then((user1) => {
      if (!user1) {
        console.log("user doesnt exist");
        res.render("index", {
          title: "User doesnot exist",
          route: "login",
        });
      } else {
        // Checking if the email is verified or not. ------------ON HOLD-------------------
        // if (!user1.isVerified) {
        //     return res.status(401).send({
        //         type: 'not-verified',
        //         msg: 'Your account has not been verified.'
        //     });
        // }
        req.session.user = "authenticated";
        req.session.currentUser = user1;
        res.render("index.ejs", {
          title: "Successfully Logged in!!",
          route: "/",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
