var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var Comment = require('../models/comment');

// ==================
// COMMENTS ROUTES
// ==================
router.get('/recipes/:id/comments/new', isLoggedIn, function(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {recipe: recipe});
        }
    });
});

router.post('/recipes/:id/comments', isLoggedIn, function(req, res) {
    //Lookup recipe
    Recipe.findById(req.params.id, function(err, recipe) {
        if(err){
            console.log(err);
            res.redirect('/recipes');
        } else {
            //Create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //Connect comment to recipe
                    recipe.comments.push(comment);
                    recipe.save();
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