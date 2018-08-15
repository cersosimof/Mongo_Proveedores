var express = require('express');
var router = express.Router();
var Exp = require('../../public/models/modelExpediente').Exp;

module.exports = (req, res, next) => {
    var nroExp = req.params.nroExp;
    var empresa = req.params.empresa; 

    Exp.update({"nroExp" : nroExp }, { $pull: { empresas: { nombre: empresa } } }, { multi: true }, function(err, results) {
        console.log(results)
    })
    res.redirect("/armar/"+nroExp)
}

