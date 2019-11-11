var mongoose = require("mongoose");
 
var favoriteSchema = new mongoose.Schema({
    value: Boolean
});
 
module.exports = mongoose.model("Favorite", favoriteSchema);