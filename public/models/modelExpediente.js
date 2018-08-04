var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect("mongodb://localhost/proveedores");
// mongoose.connect('mongodb://<cherso88>:<espora1436>@ds113522.mlab.com:13522/proveedores',
// { useNewUrlParser : true
// });

var exp_schema = new Schema({
    nroExp : Number,
    empresas : Array,
    feedback : String
})

var Exp = mongoose.model("Exp", exp_schema);

module.exports.Exp = Exp;