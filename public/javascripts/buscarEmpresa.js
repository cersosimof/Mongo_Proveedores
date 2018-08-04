var express = require('express');
var router = express.Router();
// var Proveedor = require('../public/models/modelProveedor').Proveedor;
var mongoose = require('mongoose')

module.exports = (req, res, next) => {
    var buscarEmpresa = function(nombre) {
        AccountModel.aggregate([
            { $group: {
                _id: '$nombre'
            }}
        ], function (err, result) {
            if (err) {
                if (err) throw err;
            } else {
                res.send(JSON.stringify(result));
            }

        });
    }
}


        // db.proveedors.aggregate( [ {$group : { _id : "$nombre" } } ] )


        // db.proveedors.aggregate( [ {$group : { _id : "$nombre" } } ] )