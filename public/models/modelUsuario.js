var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
    user : String,
    pass : String
})

var User = mongoose.model("User", user_schema);

module.exports.User = User;