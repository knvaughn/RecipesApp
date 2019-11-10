// RESTFUL ROUTES - a way of mapping HTTP routes and CRUD (Create, Read, Update, Destroy)
//
// name        url                      verb        description
// ==============================================================================================
// INDEX     /recipes                   GET        get all recipes
// NEW       /recipes/new               GET        displays form to create new recipe
// CREATE    /recipes                   POST       add new recipe to the database
// SHOW      /recipes/:id               GET        shows info about one recipe
// EDIT      /recipes/:id/edit          GET        displays edit form to edit a recipe
// UPDATE    /recipes/:id               PUT        updates a specific recipe and redirects somewhere
// DESTROY   /recipes/:id               DELETE     deletes a specific recipe and redirects somewhere    
// ==============================================================================================
//
// NESTED ROUTES
//
// NEW       /recipes/:id/comments/new  GET
// CREATE    /recipes/:id/comments      POST
//
// ==============================================================================================

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user')

// ======================
// ROOT ROUTE
// ======================
router.get('/', function(req, res){
    res.render('home');
});

// ======================
// AUTHENTICATION ROUTES
// ======================
router.get('/secret', isLoggedIn, function(req, res) {
    res.render('user/secret');
});

router.get('/register', function(req, res) {
    res.render('user/register');
});

router.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render('user/register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/recipes');
        })
    });
});

router.get('/login', function(req, res) {
    res.render('user/login');
});

router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/recipes',
        failureRedirect: '/login'
    }
), function(req, res) {

});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = router;