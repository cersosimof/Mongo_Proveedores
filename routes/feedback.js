var express = require('express');
var router = express.Router();
var Exp = require('../public/models/modelExpediente').Exp;
var Proveedor = require('../public/models/modelProveedor').Proveedor;

router.get('/', function(req, res) {          
    if (req.session.user) {
        Exp.find( { 'feedback' : 'no' }, (err, results) => {
            if(err) throw err;
            console.log(results) 
            res.render('feedback', { expedientes : results, 'usuario' : req.session.user})
        })      
    } else {
        res.redirect('/');  
    }
})

router.get('/:nroExp', function(req, res) {          
    if (req.session.user) {
        var nroExp = req.params.nroExp;
        //PONER EL QUE BUSCA LAS EMPRESAS EN LISTA
        Exp.find({ 'nroExp' : nroExp }, {empresas : 1, _id : 0}, [nroExp], (err, results) => {
            if(err) throw err;
            console.log(results)
            res.render('feedbackEmpresa', { expedientes : results[0].empresas, 'usuario' : req.session.user, 'nroExp' : nroExp})
        })      
    } else {
        res.redirect('/');  
    }
})

router.post('/:nroExp', function(req, res) {          
    if (req.session.user) {
        var nroExp = req.params.nroExp;
        var cotizo = req.body.contesto; //trae array con las empresas que cotizaron

        //cambia el estado de feedback a SI, el expediente no vuelve a aparecer.
        Exp.update({ 'nroExp' : nroExp }, {$set : {'feedback' : 'si'}}, function (err, results) {
        console.log('El expediente ya fue revisado.')
        })

        if(Array.isArray(cotizo)){ //Si paso mas de una empresa, se hace array
            for (var i = 0; i < cotizo.length; i++) {
                Proveedor.update({ 'nombre' : cotizo[i] }, {$inc : {'cotizo' : 1}},function(err, results) {
                    console.log('La empresa sumo 1 nuevo en cotizo')
                    console.log('-------------------------------------------------')
                })
            }
        } else { //si pasa una sola empresa, solo pasa el nombre
            Proveedor.update({ 'nombre' : cotizo }, {$inc : {'cotizo' : 1}},function(err, results) {
                console.log('La empresa sumo 1 nuevo en cotizo')
                console.log('-------------------------------------------------')
            })
        }

        if(Array.isArray(cotizo)){ //Si paso mas de una empresa, se hace array
            for (var i = 0; i < cotizo.length; i++) {
                Proveedor.find({ 'nombre' : cotizo[i] }, { 'nombre' : 1,'invitado' : 1, 'cotizo' : 1, _id : 0 },function(err, results) {
                    var empresa = results[0].nombre;
                    var invitado = results[0].invitado;
                    var cotizo = results[0].cotizo;
                    var promedio = (cotizo/invitado)*100;
                    Proveedor.update({ 'nombre' : empresa }, {'prom' : promedio}, function(err, results) {
                        console.log('Se actualizo el promedio')
                        console.log('------------------------')
                    })
                })
            }
            res.render('feedbackEmpresa', { 'feedbackSi' : 'Gracias por la informacion', 'usuario' : req.session.user, 'nroExp' : nroExp})
        } else { //si pasa una sola empresa, solo pasa el nombre
            Proveedor.find({ 'nombre' : cotizo }, { 'nombre' : 1,'invitado' : 1, 'cotizo' : 1, _id : 0 },function(err, results) {
                var empresa = results[0].nombre;
                var invitado = results[0].invitado;
                var cotizo1 = results[0].cotizo;
                var promedio = (cotizo1/invitado)*100;
                Proveedor.update({ 'nombre' : empresa }, {'prom' : promedio}, function(err, results) {
                    console.log('Se actualizo el promedio')
                    console.log('----------------------------')
                })
            })
            res.render('feedbackEmpresa', { 'feedbackSi' : 'Gracias por la informacion', 'usuario' : req.session.user, 'nroExp' : nroExp})
        } 
    } else {
        res.redirect('/');  
    }
})

module.exports = router;


