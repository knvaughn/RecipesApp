var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var Favorite = require('../models/favorite');
var middleware = require('../middleware');

// ==================
// FAVORITES ROUTES
// ==================

router.post('/recipes/:id/favorites', middleware.isLoggedIn, function(req, res) {
    var currentUserUsername = req.user.username;

    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            console.log(err);
        }

        Favorite.find({ "author.username" : currentUserUsername, "parent.id" : recipe._id },function(err, found){
            if(err) {
                console.log(err);
            }

            if(found.length>0) {
                //console.log("found existing favorite");
                found.forEach(function(item){
                    //console.log('item',item);
                    item.value == true ? item.value = false : item.value = true;
                    item.save(function(err){
                        if(err) {
                            console.log(err);
                        }
                    });
                    res.redirect(`/recipes/${req.params.id}`);
                });
            } else {
                Favorite.create(req.body.favorite, function(err, favorite) {
                    if(err) {
                        console.log(err);
                        res.redirect('/recipes');
                    } else {
                        favorite.author.id = req.user._id;
                        favorite.author.username = req.user.username;
                        favorite.parent.id = recipe._id;
                        favorite.save();
                        //console.log('Saved new favorite');
                        recipe.favorites.push(favorite);
                        recipe.save(function(err) {
                            if(err) {
                                console.log(err)
                            }
                            //console.log('Added new favorite to recipe');
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