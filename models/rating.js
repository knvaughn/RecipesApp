var mongoose = require("mongoose");
 
var ratingSchema = new mongoose.Schema({
    number: Number
});
 
module.exports = mongoose.model("Rating", ratingSchema);