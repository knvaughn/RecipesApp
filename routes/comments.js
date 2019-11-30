var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// ==================
// COMMENTS ROUTES
// ==================
router.get('/recipes/:id/comments/new', middleware.isLoggedIn, function(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {recipe: recipe});
        }
    });
});

router.post('/recipes/:id/comments', middleware.isLoggedIn, function(req, res) {
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

router.get('/recipes/:id/comments/:commentId/edit', middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.commentId, function(err, comment) {
        if(err) {
            console.log(err);
            res.redirect("back");
        }
        res.render('comments/edit', {recipe_id: req.params.id, comment: comment});
    });
});

router.put('/recipes/:id/comments/:commentId', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect(`/recipes/${req.params.id}`);
        }
    });
});

router.delete('/recipes/:id/comments/:commentId', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.commentId, function(err, commentRemoved) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect(`/recipes/${req.params.id}`);
        }
    });
});

module.exports = router;