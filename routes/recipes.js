var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var Comment = require('../models/comment');

// INDEX
router.get('/recipes', function(req, res){
    // Get recipes from database
    Recipe.find({}).populate("ratings").exec(function(err, recipes) {
        if(err) {
            console.log(err);
        } else {
            // Render the recipes page and pass through the recipes from database and the calculated average rating
            res.render('recipes/index', {recipes: recipes});
        }
    });
});

// CREATE
router.post('/recipes', isLoggedIn, function(req, res){
    var recipeTitle = req.body.recipetitle;
    var imageURL = req.body.imageurl;
    var recipeDifficulty = req.body.difficulty;
    var recipeTime = req.body.time;
    var recipeTags = req.body.tags;
    var recipeIngredients = req.body.ingredients;
    var recipeDirections = req.body.directions;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newRecipe = {
        title: recipeTitle, 
        image: imageURL,
        difficulty: recipeDifficulty,
        time: recipeTime,
        tags: recipeTags,
        ingredients: recipeIngredients,
        directions: recipeDirections,
        comments: [],
        ratings: [],
        author: author
    }
    // Create new recipe and save to database
    Recipe.create(newRecipe, function(err, recipe) {
        if(err) {
            console.log(err)
        } else {
            console.log(recipe)
            res.redirect('/recipes');
        }
    });
});

// NEW
router.get('/recipes/new', isLoggedIn, function(req, res) {
    res.render('recipes/new');
});

// SHOW
router.get('/recipes/:id', function(req, res){
    Recipe.findById(req.params.id).populate("comments").populate("ratings").exec(function(err, recipe) {
        if(err) {
            console.log(err);
            res.redirect('/recipes');
        } else {
            //Calculate the new average rating
            var sum = 0;
            recipe.ratings.forEach(function(rating) {
                var num = parseInt(rating.value);
                sum += num;
            });
            var averageRating = sum / recipe.ratings.length;
            averageRating = Math.round(averageRating*10)/10;
            // Render the show page and pass through the specific recipe from database
            res.render('recipes/show', {recipe: recipe, averageRating: averageRating});
        }
    });
});

// EDIT
router.get('/recipes/:id/edit', checkOwnership, function(req, res){
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/edit', {recipe: recipe});
    });
});

// UPDATE
router.put('/recipes/:id', checkOwnership, function(req, res) {
    var recipeTitle = req.body.recipetitle;
    var imageURL = req.body.imageurl;
    var recipeDifficulty = req.body.difficulty;
    var recipeTime = req.body.time;
    var recipeTags = req.body.tags;
    var recipeIngredients = req.body.ingredients;
    var recipeDirections = req.body.directions;
    var recipeRating = req.body.recipeRating;
    var recipeID = req.params.id;
    var updatedRecipe = {
        title: recipeTitle, 
        rating: recipeRating,
        image: imageURL,
        difficulty: recipeDifficulty,
        time: recipeTime,
        tags: recipeTags,
        ingredients: recipeIngredients,
        directions: recipeDirections
    }
    // Find the existing recipe and update it
    Recipe.findByIdAndUpdate(recipeID, updatedRecipe, function(err, updatedRecipe) {
        res.redirect(`/recipes/${recipeID}`);
    });
});

// DELETE
router.delete('/recipes/:id', checkOwnership, function(req, res) {
    Recipe.findByIdAndRemove(req.params.id, function(err, recipeRemoved) {
        Comment.deleteMany( {_id: { $in: recipeRemoved.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/recipes');
        });
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

function checkOwnership(req, res, next) {
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

module.exports = router;

// var relish = new Recipe({
//     title: 'Relish',
//     image: 'https://cdn.pixabay.com/photo/2015/02/06/15/50/canning-626204_960_720.jpg',
//     difficulty: "easy",
//     time: "2 hr",
//     tags: ["Canning"]
// });
// relish.save(function(err, recipe){
//     if(err) {
//         console.log("Error");
//     } else {
//         console.log("Success! Newly created: ");
//         console.log(recipe);
//     }
// });