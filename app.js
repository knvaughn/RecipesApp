var express                 = require('express'),
    app                     = express(),
    bodyParser              = require('body-parser'),
    mongoose                = require('mongoose'),
    methodOverride          = require('method-override'),
    Comment                 = require('./models/comment'),
    Rating                  = require('./models/rating'),
    Recipe                  = require('./models/recipe'),
    Favorite                = require('./models/favorite'),
    passport                = require('passport'),
    User                    = require('./models/user'),
    LocalStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose'),
    multer                  = require('multer'),
    path                    = require('path'),
    seedDB                  = require('./seeds');

var recipeRoutes            = require('./routes/recipes'),
    commentRoutes           = require('./routes/comments'),
    ratingRoutes            = require('./routes/ratings'),
    favoriteRoutes          = require('./routes/favorites'),
    comingSoonRoutes        = require('./routes/coming-soon'),
    uploadRoutes            = require('./routes/uploads'),
    indexRoutes             = require('./routes/index');

const db = require('./db');

//seedDB();

app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: "The Invention of Nature",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(recipeRoutes);
app.use(commentRoutes);
app.use(ratingRoutes);
app.use(favoriteRoutes);
app.use(uploadRoutes);
app.use(comingSoonRoutes);

//mongoose.connect("mongodb://localhost:27017/simplefarmandgarden", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

app.listen(3000, function(){
    console.log('Starting app on port 3000');
});