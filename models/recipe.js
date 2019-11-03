var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    title: String,
    rating: Number,
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
    ]
});

module.exports = mongoose.model("Recipe", recipeSchema);