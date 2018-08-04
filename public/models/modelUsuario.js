var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect("mongodb://localhost/proveedores");
mongoose.connect('mongodb://<cherso88>:<espora1436>@ds113522.mlab.com:13522/proveedores',
{ useMongoClient : true
});

var user_schema = new Schema({
    user : String,
    pass : String
})

var User = mongoose.model("User", user_schema);

module.exports.User = User;