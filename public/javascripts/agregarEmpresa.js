var express = require('express');
var router = express.Router();
var Proveedor = require('../../public/models/modelProveedor').Proveedor;
var Exp = require('../../public/models/modelExpediente').Exp;

module.exports = (req, res, next) => {
    var nroExp = req.body.nroExp;
    var empresa = req.body.empresa;

    Proveedor.find({ "nombre" : empresa }, function(error, results){

        var emp = results;
        Exp.update({"nroExp" : nroExp }, { $push: { empresas:  emp  } }, { multi: true }, function(err, results) {
            if(err) {
                console.log(err)
            } else {
                res.redirect(307, "armar/"+nroExp)
            }
        })
    })
}