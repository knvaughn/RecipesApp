var mongoose = require("mongoose");
 
var ratingSchema = new mongoose.Schema({
    value: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    parent: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }
    }
});
 
module.exports = mongoose.model("Rating", ratingSchema);