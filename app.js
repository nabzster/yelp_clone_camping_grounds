var methodOverride = require("method-override"),
    LocalStrategy = require("passport-local").Strategy,
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    session = require("express-session"),
    express = require("express"),
    flash = require("connect-flash"),
    //seedDB = require("./seeds"),
    User = require("./models/user"),
    app = express();
    
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    authRoutes       = require("./routes/index");

mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
mongoose.connect(process.env.DATABASEURL, { useMongoClient: true });

console.log(process.env.DATABASEURL);

app.set("view engine", "ejs");

app.use(session({
    secret: "Toronto",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.moment = require("moment");
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server Started");
});
