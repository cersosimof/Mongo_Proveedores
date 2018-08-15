var express = require('express');
var router = express.Router();
var Proveedor = require('../../public/models/modelProveedor').Proveedor;

module.exports = (req, res, next) => {
    Proveedor.aggregate( [ { $group : { _id : "$nombre" } } ],  function(error, results) {
    if (error) throw error;
    var superArray = []
    for (var i = 0; i < results.length; i++){
        var empresa = superArray.indexOf(results[i])
        if(empresa === (-1)) {
            superArray.push(results[i]._id)
        }
    }
    res.send(JSON.stringify(superArray));
    })
}
