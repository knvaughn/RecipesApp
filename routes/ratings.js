var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var Rating = require('../models/rating');
var middleware = require('../middleware');

// ==================
// RATINGS ROUTES
// ==================
router.post('/recipes/:id/ratings', middleware.isLoggedIn, function(req, res) {
    var currentUserUsername = req.user.username;
    var submittedRating = req.body.rating.value;

    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            console.log(err);
        }

        Rating.find({ "author.username" : currentUserUsername, "parent.id" : recipe._id },function(err, found){
            if(err) {
                console.log(err);
            }
            //console.log('found', found);
            if(found.length>0) {
                //console.log("found existing rating");
                found.forEach(function(item){
                    //console.log('item',item);
    
                    item.value = submittedRating;
                    item.save(function(err){
                        if(err) {
                            console.log(err);
                        }
                        //console.log('Submitted Rating: ', submittedRating);
                    });
                    res.redirect(`/recipes/${req.params.id}`);
                });
            } else {
                //console.log('creating new rating');
                Rating.create(req.body.rating, function(err, rating) {
                    if(err) {
                        console.log(err);
                        res.redirect('/recipes');
                    } else {
                        rating.author.id = req.user._id;
                        rating.author.username = req.user.username;
                        rating.parent.id = recipe._id;
                        rating.save();
                        //console.log('Saved new rating');
                        recipe.ratings.push(rating);
                        recipe.save(function(err) {
                            if(err) {
                                console.log(err)
                            }
                            //console.log('Added new rating to recipe');
                        });
                        //Redirect to the recipe show page
                        res.redirect(`/recipes/${recipe._id}`);
                    }
                });
            }
            
        });
        
    });

});

module.exports = router;