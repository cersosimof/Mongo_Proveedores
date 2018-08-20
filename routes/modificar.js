var express = require('express');
var router = express.Router();
var Proveedor = require('../public/models/modelProveedor').Proveedor;
var mongoose = require('mongoose')

//modificar GET
router.get('/', function(req, res) {          
    if (req.session.user) {
        res.render('modificar', {'usuario' : req.session.user})
    } else {
        res.redirect('/');  
    }
})

router.post('/', function(req, res) {
    var empresa = req.body.empresa;
    if (req.session.user) {
        res.redirect('/modificar/'+ empresa)
    } else {
        res.redirect('/');  
    }
})

router.get('/:empresa', function(req, res) {
    if (req.session.user) {
        Proveedor.find({ 'nombre' : req.params.empresa }, (err, results) => {
            if(err) throw err;
            if (results.length == 0){
            res.redirect('errorlog');
            } else {
            res.render('modificar', {'empresa' : req.params.empresa, 'resultado' : results, 'usuario' : req.session.user})
            } 
        });
    } else {
        res.render('index');  
    }
})

router.post('/:empresa/update', function(req, res) {
    if (req.session.user) {
        Proveedor.update({ 'nombre' : req.params.empresa   }, { 'correo' : req.body.correo, 'telefono' : req.body.telefono, 'contacto' : req.body.contacto, 'ramo' : req.body.ramo }, (err, results) => {
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
})

module.exports = router;
