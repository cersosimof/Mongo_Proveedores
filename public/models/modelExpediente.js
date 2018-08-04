var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/proveedores");

var exp_schema = new Schema({
    nroExp : Number,
    empresas : Array,
    feedback : String
})

var Exp = mongoose.model("Exp", exp_schema);

module.exports.Exp = Exp;