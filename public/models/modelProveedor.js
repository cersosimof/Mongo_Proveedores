var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect("mongodb://localhost/proveedores");
mongoose.connect("mongodb://<cersosimof>:<espora1436>@ds263791.mlab.com:63791/prov_crud", { useNewUrlParser: true });

var proveedor_schema = new Schema({
    nombre : String,
    correo : String,
    telefono : String,
    contacto : String,
    ramo : String,
    invitado : Number,
    cotizo : Number,
    prom : Number
})

var Proveedor = mongoose.model("Proveedor", proveedor_schema);

module.exports.Proveedor = Proveedor;