var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Connect to Database
mongoose.connect("mongodb://localhost:27017/simplefarmandgarden", {useUnifiedTopology: true, useNewUrlParser: true});

// Schema setup
var recipeSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    image: String,
    difficulty: String,
    time: String,
    tags: Array,
    ingredients: Array,
    directions: String
});

// Model setup
var Recipe = mongoose.model("Recipe", recipeSchema);

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

// RESTFUL ROUTES - a way of mapping HTTP routes and CRUD (Create, Read, Update, Destroy)
//
// name        url                  verb        description
// ==============================================================================================
// INDEX     /recipes               GET        get all recipes
// NEW       /recipes/new           GET        displays form to create new recipe
// CREATE    /recipes               POST       add new recipe to the database
// SHOW      /recipes/:id           GET        shows info about one recipe
// EDIT      /recipes/:id/edit      GET        displays edit form to edit a recipe
// UPDATE    /recipes/:id           PUT        updates a specific recipe and redirects somewhere
// DESTROY   /recipes/:id           DELETE     deletes a specific recipe and redirects somewhere    
// ==============================================================================================

app.get('/', function(req, res){
    res.render('home');
});

// INDEX
app.get('/recipes', function(req, res){
    // Get recipes from database
    Recipe.find({}, function(err, recipes) {
        if(err) {
            console.log(err);
        } else {
            // Render the recipes page and pass through the recipes from database
            res.render('index', {recipes: recipes});
        }
    });
});

// CREATE
app.post('/recipes', function(req, res){
    var recipeTitle = req.body.recipetitle;
    var imageURL = req.body.imageurl;
    var recipeDifficulty = req.body.difficulty;
    var recipeTime = req.body.time;
    var recipeTags = req.body.tags;
    var recipeIngredients = req.body.ingredients;
    var recipeDirections = req.body.directions;
    var newRecipe = {
        title: recipeTitle, 
        rating: 0,
        image: imageURL,
        difficulty: recipeDifficulty,
        time: recipeTime,
        tags: recipeTags,
        ingredients: recipeIngredients.split("\n"),
        directions: recipeDirections
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
app.get('/recipes/new', function(req, res) {
    res.render('new');
});

// SHOW
app.get('/recipes/:id', function(req, res){
    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            console.log(err);
        } else {
            // Render the show page and pass through the specific recipe from database
            res.render('show', {recipe: recipe});
        }
    });
});

app.listen(3000, function(){
    console.log('Starting app on port 3000');
});