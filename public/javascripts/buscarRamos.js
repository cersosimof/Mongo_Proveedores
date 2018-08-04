var express = require('express');
var router = express.Router();
var Proveedor = require('../../public/models/modelProveedor').Proveedor;

module.exports = (req, res, next) => {

    Proveedor.aggregate( [ { $group : { _id : "$ramo" } } ],  function(error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results));
    })
}
