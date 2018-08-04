var express = require('express');
var router = express.Router();
var Proveedor = require('../public/models/modelProveedor').Proveedor;

router.get('/', function(req, res) {          
    if (req.session.user) {
        res.render('ver', {'usuario' : req.session.user})
    }
})

router.post('/', function(req, res) {
    var ramo = req.body.ramo;
    if (req.session.user) {
        res.redirect('/ver/'+ramo)
    } else {
        res.render('index');  
    }
})

router.get('/:ramo', function(req, res) {
    Proveedor.find(  { "ramo" : {$regex : req.params.ramo} }, function(err, results)  {
        if (err) throw err;
        if(results.length == 0){
            res.render('ver', {'usuario' : req.session.user , 'mensaje' : 'NO HAY PROVEEDORES PARA ESTA BUSQUEDA'})
        } else {
            console.log(results)
            res.render('ver', {'usuario' : req.session.user, 'productos' : results, 'dividir' : '/'})       
        }
    })
})

module.exports = router;
