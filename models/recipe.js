var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    ratingAverage: Number,
    title: String,
    image: String,
    difficulty: String,
    time: String,
    tags: Array,
    ingredients: String,
    directions: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
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