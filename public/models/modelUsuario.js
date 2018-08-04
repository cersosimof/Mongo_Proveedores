var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/proveedores");
// mongoose.connect("mongodb://<cersosimof>:<espora1436>@ds263791.mlab.com:63791/prov_crud", { useNewUrlParser: true });

var user_schema = new Schema({
    user : String,
    pass : String
})

var User = mongoose.model("User", user_schema);

module.exports.User = User;