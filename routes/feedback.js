var Exp = require('../public/models/modelExpediente').Exp;
var Proveedor = require('../public/models/modelProveedor').Proveedor;

exports.select = function(req, res) {          
    if (req.session.user) {
        Exp.find( { 'feedback' : 'no' }, (err, results) => {
            if(err) throw err;
            res.render('feedback', { expedientes : results, 'usuario' : req.session.user})
        })      
    } else {
        res.redirect('/');  
    }
}

exports.listado = function(req, res) {             
    if (req.session.user) {
        var nroExp = req.params.nroExp;

        //PONER EL QUE BUSCA LAS EMPRESAS EN LISTA
        Exp.find({ 'nroExp' : nroExp }, {empresas : 1, _id : 0}, [nroExp], (err, results) => {
            if(err) throw err;
            res.render('feedbackEmpresa', { expedientes : results[0].empresas, 'usuario' : req.session.user, 'nroExp' : nroExp})
        })      
    } else {
        res.redirect('/');  
    }
}


exports.enviar1 = function(req, res, next) {           
    var nroExp = req.params.nroExp;
    var cotizo = req.body.contesto; 
    
    if(Array.isArray(cotizo)) {
        var arrayEmpresas = cotizo
    } else {
        var arrayEmpresas = []
        arrayEmpresas.push(cotizo)
    }

    var count = 0;
    while(count == 0){ /* NO PASA HASTA NO ENVIAR TODOS LOS COTIZO
    /* SUMA UNO A LAS EMPRESAS QUE COTIZARON */
        for (var i = 0; i < arrayEmpresas.length; i++) {
            Proveedor.update({ 'nombre' : arrayEmpresas[i] }, {$inc : {'cotizo' : 1}},function(err, results) {
                console.log('___ SUMO 1 A CADA EMPRESA QUE COTIZO EN COTIZO ___')
            })
        } count++
    } next() /* PASA AL SIGUIENTE (ENVIAR 2) */
    /* SUMA UNO A LAS EMPRESAS QUE COTIZARON */
    }


exports.enviar2 = function(req, res) {             
    if (req.session.user) {
        var nroExp = req.params.nroExp;
        var cotizo = req.body.contesto; 

        /* CAMBIA EL ESTADO DE FEEDBACK DE SI A NO */
        Exp.update({ 'nroExp' : nroExp }, {$set : {'feedback' : 'si'}}, function (err, results) {
            console.log(' ___ EL EXPEDIENTE YA FUE FEEDBACKEADO ___ ')
        })
        /* CAMBIA EL ESTADO DE FEEDBACK DE SI A NO */

        /* SUMA UNO A TODAS LAS EMPRESAS QUE PARTICIPARON */
        Exp.find({ 'nroExp' : nroExp }, {empresas : 1, _id : 0}, function(err, results){
            var largo = results[0].empresas.length
            var count = 0;
            while(count == 0) {
                for (var i = 0; i < largo; i++) {
                    Proveedor.update({ 'nombre' : results[0].empresas[i].nombre }, {$inc : {'invitado' : 1}},function(err, results) {
                        console.log(' ___ SE SUMO 1 EN LA EMPRESAS QUE PARTICIPO ___ ')
                    })
                } count++
            } 

            for (var x = 0; x < largo; x++) {
                Proveedor.find({ 'nombre' : results[0].empresas[x].nombre  }, { 'nombre' : 1,'invitado' : 1, 'cotizo' : 1, _id : 0 },function(err, results) {
                    var empresa = results[0].nombre;
                    var invitado = results[0].invitado;
                    var cotizo = results[0].cotizo;
                    var promedio = ((cotizo/invitado)*100).toFixed();
        
                    Proveedor.update({ 'nombre' : empresa }, { 'prom' : promedio}, function(err, results) {
                        console.log('___ SE ACTUALIZO EL PROMEDIO ___')
                    })
                })
            }

        })
        /* SUMA UNO A TODAS LAS EMPRESAS QUE PARTICIPARON */
    res.redirect('/')   
    } else {
        res.redirect('/');  
    }
}

