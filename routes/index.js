var express = require("express"),
    router = express.Router(),
    User = require("../models/user.js"),
    passport = require("passport");
    
// ROOT ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

// --------------------
// AUTH ROUTES
// --------------------

// REGISTER FORM
router.get("/register", function(req, res) {
    res.render("register", { page: "register" });
});

// REGISTER LOGIC
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });

    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN FORM
router.get("/login", function(req, res) {
    res.render("login", { page: "login" });
});

// LOGIN LOGIC

// router.post("/login", passport.authenticate("local"), function(req, res) {
//     console.log("The user " + req.user.username + " has logged in!");
//     res.redirect("/campgrounds");
// });

// ANOTHER WAY

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
}), function(req, res) {
    console.log(req.user.username + " has logged in.");
});

// LOGOUT LOGIC
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/campgrounds");
});

module.exports = router;