var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac sollicitudin ligula. Phasellus sagittis eget neque eget scelerisque. Suspendisse ac fermentum ligula, vel porta ante. Proin consectetur ullamcorper libero. Vestibulum efficitur elit in justo mattis, in imperdiet mauris interdum. In hac habitasse platea dictumst. Nam quis tincidunt nisi, eget tristique tortor. Fusce eu tellus lacinia, pretium justo eu, ultricies ante. Sed sit amet euismod risus, id malesuada nibh. Morbi commodo pretium bibendum. Nulla facilisi."
    },  
    {
        name: "Desert Mesa",
        image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac sollicitudin ligula. Phasellus sagittis eget neque eget scelerisque. Suspendisse ac fermentum ligula, vel porta ante. Proin consectetur ullamcorper libero. Vestibulum efficitur elit in justo mattis, in imperdiet mauris interdum. In hac habitasse platea dictumst. Nam quis tincidunt nisi, eget tristique tortor. Fusce eu tellus lacinia, pretium justo eu, ultricies ante. Sed sit amet euismod risus, id malesuada nibh. Morbi commodo pretium bibendum. Nulla facilisi."
    },
    {
        name: "Canyon Floor",
        image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac sollicitudin ligula. Phasellus sagittis eget neque eget scelerisque. Suspendisse ac fermentum ligula, vel porta ante. Proin consectetur ullamcorper libero. Vestibulum efficitur elit in justo mattis, in imperdiet mauris interdum. In hac habitasse platea dictumst. Nam quis tincidunt nisi, eget tristique tortor. Fusce eu tellus lacinia, pretium justo eu, ultricies ante. Sed sit amet euismod risus, id malesuada nibh. Morbi commodo pretium bibendum. Nulla facilisi."
    }
];

function seedDB() {
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err) {
        // if (err) {   
        //     console.log("err"); 
        // }
        // console.log("removed campgrounds!");
        // // ADD A NEW CAMPGROUND
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("Added a campground");
        //             // CREATE A COMMENT
        //             Comment.create(
        //                 {
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 }, function(err, comment) {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Create a new comment");
        //                     }
        //             });
        //         }
        //     });    
        // });
    });
}

module.exports = seedDB;
