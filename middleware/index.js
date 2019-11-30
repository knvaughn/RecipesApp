var middlewareObj = {};
var Recipe = require('../models/recipe');
var Comment = require('../models/comment');

middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

middlewareObj.checkOwnership = function (req, res, next) {
    if(req.isAuthenticated()) {
        Recipe.findById(req.params.id, function(err, recipe) {
            if(err) {
                console.log(err);
                res.redirect('/recipes');
            } else {
                if(recipe.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.commentId, function(err, comment) {
            if(err) {
                console.log(err);
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

module.exports = middlewareObj;