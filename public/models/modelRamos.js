var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ramo_schema = new Schema({
    ramo : String,
})

var Ramo = mongoose.model("Ramo", ramo_schema);

module.exports.Ramo = Ramo;