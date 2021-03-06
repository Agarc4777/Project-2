const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // If the user has valid credentials send them to the members page.
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/goals", function (req, res) {
    db.Goals.create({
      goals: req.body.goals,
      complete: req.body.complete,
      UserId: req.user.id,
    }).then(function (dbGoals) {
      // console.log(dbGoals);
      res.json(dbGoals);
    });
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
};
