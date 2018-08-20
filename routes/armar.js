var express = require('express');
var router = express.Router();
var Exp = require('../public/models/modelExpediente').Exp;
var Proveedor = require('../public/models/modelProveedor').Proveedor;

//armar GET
router.get('/', function(req, res) {          
    if (req.session.user) {
        res.render('armar', {'usuario' : req.session.user})
    } else {
        res.redirect('/');  
    }
})


router.post('/', function(req, res) {
    if (req.session.user) {  //SI ESTA LOGUEADO  
        Proveedor.find(  { "ramo" : {$regex : req.body.ramo} }, function(err, results)  {
            if(results.length == 0){
            //SI LA BUSQUEDA NO OBTIENE RESULTADOS
            res.render("armar", { 'mensaje' : 'No se encontraron empresas de este rubro', 'usuario' : req.session.user})
            } else {
                var resultados = results;
                var armarExp = new Exp ( { 'nroExp' : req.body.nroExp, 'empresas' : resultados, 'feedback' : 'no' })
                armarExp.save()
                res.redirect(307, "/armar/"+req.body.nroExp) //redirecciona por POST
                }
        })
    } else {
        res.redirect('/');  //SI NO ESTAS LOGUEADO
    }
})


router.post('/:nroExp', function(req, res) {          
    if (req.session.user) {
        var nroExp = req.params.nroExp;
        Exp.find({ 'nroExp' : nroExp }, {empresas : 1, _id : 0}, function(err, results){
            if(results.length == 0 ) {
                if(err) throw err;
                res.render('errorlog')
            } else {
                //suma 1 a cada empesa que cotizo.
                var cotizo = results[0].empresas
                for (var i = 0; i < cotizo.length; i++) {
                    Proveedor.update({ 'nombre' : results[0].empresas[i].nombre }, {$inc : {'invitado' : 1}},function(err, results) {
                        console.log('La empresa sumo 1 nuevo en cotizo')
                        console.log('-------------------------------------------------')
                    })
                }
                res.render("armado", { "empresas" : results[0].empresas, "usuario" : req.session.user, "nroExp" : nroExp })
            }
          })
    } else {
        res.redirect('/');  
    }
})

module.exports = router;


