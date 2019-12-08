var mongoose = require("mongoose");
 
var favoriteSchema = new mongoose.Schema({
    value: Boolean,
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
 
module.exports = mongoose.model("Favorite", favoriteSchema);