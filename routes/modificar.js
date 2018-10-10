var Proveedor = require('../public/models/modelProveedor').Proveedor;
var mongoose = require('mongoose')

//modificar GET
exports.inicio = function(req, res) {         
    if (req.session.user) {
        res.render('modificar', {'usuario' : req.session.user})
    } else {
        res.redirect('/');  
    }
}

exports.inicioP = function(req, res) {  
    var empresa = req.body.empresa;
    if (req.session.user) {
        res.redirect('/modificar/'+ empresa)
    } else {
        res.redirect('/');  
    }
}

exports.empresa = function(req, res) {  
    if (req.session.user) {
        Proveedor.find({ 'nombre' : req.params.empresa }, (err, results) => {
            if(err) throw err;
            if (results.length == 0){
            res.redirect('errorlog');
            } else {
            res.render('modificar', { 'empresa' : req.params.empresa, 'resultado' : results, 'usuario' : req.session.user })
            console.log(results)
            } 
        });
    } else {
        res.render('index');  
    }
}

exports.modificar = function(req, res) {
    if (req.session.user) {
        Proveedor.update({ 'nombre' : req.params.empresa }, {'nombre' : req.body.nombre, 'correo' : req.body.correo, 'telefono' : req.body.telefono, 'contacto' : req.body.contacto, 'ramo' : req.body.ramo }, (err, results) => {
            if(err) throw err;
            if (results.length == 0){
            res.render('errorlog');
            } else {
            res.redirect('/')
            } 
        });
    } else {
        res.redirect('/');  
    }
}


