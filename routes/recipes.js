var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');

// INDEX
router.get('/recipes', function(req, res){
    // Get recipes from database
    Recipe.find({}).populate("ratings").exec(function(err, recipes) {
        if(err) {
            console.log(err);
        } else {
            // Render the recipes page and pass through the recipes from database
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
    var newRecipe = {
        title: recipeTitle, 
        image: imageURL,
        difficulty: recipeDifficulty,
        time: recipeTime,
        tags: recipeTags,
        ingredients: recipeIngredients,
        directions: recipeDirections,
        comments: [],
        ratings: []
    }
    // Create new recipe and save to database
    Recipe.create(newRecipe, function(err, recipe) {
        if(err) {
            console.log(err)
        } else {
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
            // Render the show page and pass through the specific recipe from database
            res.render('recipes/show', {recipe: recipe});
        }
    });
});

// EDIT
router.get('/recipes/:id/edit', isLoggedIn, function(req, res){
    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            console.log(err);
            res.redirect('/recipes');
        } else {
            // Render the edit page and pass through the specific recipe from database
            res.render('recipes/edit', {recipe: recipe});
        }
    });
})

// UPDATE
router.put('/recipes/:id', isLoggedIn, function(req, res) {
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
        if(err) {
            console.log(err)
        } else {
            res.redirect(`/recipes/${recipeID}`);
        }
    });
});

// DELETE
router.delete('/recipes/:id', isLoggedIn, function(req, res) {
    Recipe.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
            res.redirect('/recipes');
        } else {
            res.redirect('/recipes');
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