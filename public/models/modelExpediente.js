var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect("mongodb://localhost/proveedores");
mongoose.connect("mongodb://<cersosimof>:<espora1436>@ds263791.mlab.com:63791/prov_crud", { useNewUrlParser: true });

var exp_schema = new Schema({
    nroExp : Number,
    empresas : Array,
    feedback : String
})

var Exp = mongoose.model("Exp", exp_schema);

module.exports.Exp = Exp;