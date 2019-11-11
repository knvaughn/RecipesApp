var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var Rating = require('../models/rating');

// ==================
// RATINGS ROUTES
// ==================
router.post('/recipes/:id/ratings', isLoggedIn, function(req, res) {
    //Lookup recipe
    Recipe.findById(req.params.id, function(err, recipe) {
        if(err){
            console.log(err);
            res.redirect('/recipes');
        } else {
            //Add new rating
            Rating.create(req.body.rating, function(err, rating) {
                if(err) {
                    console.log(err);
                } else {
                    //Connect rating to recipe
                    recipe.ratings.push(rating);

                    recipe.save(function(err) {
                        if(err) {
                            console.log(err)
                        }
                    });
                    //Redirect to the recipe show page
                    res.redirect(`/recipes/${recipe._id}`);
                }
            });
        }
    });   
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = router;