var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect("mongodb://localhost/proveedores");
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds113522.mlab.com:13522/proveedores');
// mongodb://<dbuser>:<dbpassword>@ds263791.mlab.com:63791/prov_crud

var user_schema = new Schema({
    user : String,
    pass : String
})

var User = mongoose.model("User", user_schema);

module.exports.User = User;