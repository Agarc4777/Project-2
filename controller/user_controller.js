const express = require("express");
const router = express.Router();

const isAuthenticated = require("../config/middleware/isAuthenticated.js");

let db = require("../models");

router.get("/", function (req, res) {
  // res.redirect("/signup");
  res.render("signup");
});

router.get("/login", function (req, res) {});

router.post("/signup", function (req, res) {
  console.log("heres the body", req.body);
  db.User.create({
    email: req.body.email,
    password: req.body.password
  }
    // ["email-input", "password-input"],
    // [req.body.email, req.body.password]
  ).then(function (result) {
    if (req.user) {
      res.redirect(307, "/trainerHome");
    }
  });
  // .then(function (result) {
  //   if (req.user.is_trainer) {
  //     res.send("is trainer");
  //   } else {
  //     res.send("is client");
  //   }
  // })
  // .catch(function (err) {
  //   res.status(401).json(err);
  // });
});

// router.get("/trainerHome", isAuthenticated, function (req, res) {
//   res.render("trainerHome");
// });
// router.get("/clientHome", isAuthenticated, function (req, res) {});

module.exports = router;
