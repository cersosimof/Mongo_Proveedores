var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/proveedores");

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