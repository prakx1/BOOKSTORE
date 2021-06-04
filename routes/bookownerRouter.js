var express = require("express");
var router = express.Router();
var path = require("path");
var users = require("../models/users");

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  var ownerId = req.params.id;
  users
    .findById(ownerId, "username bookCollection bookcount profileurl gender")
    .populate({ path: "bookCollection" })
    .then((owner) => {
      res.sendStatus = 200;
      res.render("bookowner.ejs", {
        ownerbooks: owner.bookCollection,
        owner: owner,
      });
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
