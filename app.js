var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var recipes = [
    {title: 'Banana Bread', rating: 4},
    {title: 'Bread and Butter Pickles', rating: 5},
    {title: 'Kidney Bean Salad', rating: 5},
    {title: 'Apple Pie Filling', rating: 3}
];

app.get('/', function(req, res){
    res.render('home');
});

app.get('/recipes', function(req, res){
    res.render('recipes', {recipes: recipes});
});

app.get('/recipes/:recipe', function(req, res){
    var recipe = req.params.recipe;
    res.render('recipe', {recipeName: recipe});
});

app.post('/newrecipe', function(req, res){
    var recipeTitle = req.body.recipetitle;
    recipes.push({title: recipeTitle, rating: 0});
    res.redirect('recipes');
});

app.listen(3000, function(){
    console.log('Starting app on port 3000');
});