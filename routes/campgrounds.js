var express = require("express"),
    router  = express.Router(),
    middleware = require("../middleware"),
    geocoder = require("geocoder"),
    Campground = require("../models/campground");

// --------------------
// CAMPGROUNDS
// --------------------

// INDEX
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, page: 'campgrounds' });
        }
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
      id: req.user._id,
      username: req.user.username
    };
    var cost = req.body.cost;
    
    geocoder.geocode(req.body.location, function(err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = { name: name, image: image, description: desc, author: author, price: price, location: location, lat: lat, lng: lng };
        
        if (err) {
            console.log(err);
        } else {
            Campground.create(newCampground, function(err, newlyCreate) {
               if (err) {
                   console.log(err);
               } else {
                   console.log(newlyCreate);
                   console.log("------------");
                   console.log(data.results[0].geometry);
                   res.redirect("/campgrounds");
               }
            });
        }
    });
});

// SHOW - PATH PARAMETER :id
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// EDIT - /campgrounds/:id/edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE - PUT METHOD
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    geocoder.geocode(req.body.location, function(err, data) {
       var lat = data.results[0].geometry.location.lat;
       var lng = data.results[0].geometry.location.lng;
       var location = data.results[0].formatted_address;
       var newData = { 
           name: req.body.name, 
           image: req.body.image, 
           description: req.body.description, 
           cost: req.body.cost, 
           location: location, 
           lat: lat, 
           lng: lng
       };
       
       if (err) {
           console.log(err);
       } else {
           Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground) {
               if (err) {
                   req.flash("error", err.message);
                   res.redirect("back");
               } else {
                   req.flash("success", "Successfully Updated!");
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
    });
});

// DESTROY ROUTE - DELETE /campgrounds/:id
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

module.exports = router;