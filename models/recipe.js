var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    difficulty: String,
    time: String,
    tags: Array,
    ingredients: String,
    directions: String,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
    ],
    ratings: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Rating"
        }
    ]
});

module.exports = mongoose.model("Recipe", recipeSchema);