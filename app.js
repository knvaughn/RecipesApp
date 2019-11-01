var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var recipes = [
    {title: 'Banana Bread', rating: 4, image: 'https://cdn.pixabay.com/photo/2014/11/03/09/39/quark-bread-514890_960_720.jpg'},
    {title: 'Bread and Butter Pickles', rating: 5, image: 'https://cdn.pixabay.com/photo/2016/07/15/22/49/pickled-cucumbers-1520638_960_720.jpg'},
    {title: 'Kidney Bean Salad', rating: 5, image: 'https://cdn.pixabay.com/photo/2016/06/29/09/06/kidney-bean-1486298_960_720.jpg'},
    {title: 'Apple Pie Filling', rating: 3, image: 'https://cdn.pixabay.com/photo/2015/01/12/10/44/cake-597175_960_720.jpg'}
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