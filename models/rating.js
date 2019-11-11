var mongoose = require("mongoose");
 
var ratingSchema = new mongoose.Schema({
    value: Number
});
 
module.exports = mongoose.model("Rating", ratingSchema);