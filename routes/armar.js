const Exp = require('../public/models/modelExpediente').Exp;
const Proveedor = require('../public/models/modelProveedor').Proveedor;

//armar GET
exports.inicio = function(req, res) {          
    if (req.session.user) {
        res.render('armar', {'usuario' : req.session.user})
    } else {
        res.redirect('/');  
    }
}


exports.inicio1 = function(req, res) {
    if (req.session.user) {  //SI ESTA LOGUEADO  
        Proveedor.find(  { 'ramo' : {$regex : req.body.ramo} }, function(err, results)  {
            if(results.length == 0) {
            res.render('armar', { 'mensaje' : 'No se encontraron empresas de este rubro', 'usuario' : req.session.user})
            } else {
                var resultados = results;
                var armarExp = new Exp ( { 'nroExp' : req.body.nroExp, 'empresas' : resultados, 'feedback' : 'no' })
                armarExp.save()
                res.redirect('/armar/'+req.body.nroExp); 
            }
        })

    } else { //SI NO ESTAS LOGUEADO
        res.redirect('/');  
    }
}

exports.mostrar = function(req, res) {                    
        if (req.session.user) {
            var nroExp = req.params.nroExp;
            Exp.find({ 'nroExp' : nroExp }, {empresas : 1, _id : 0}, function(err, results){
                if(results.length == 0 ) {
                    if(err) throw err;
                    res.send('Hubo un error en /armar/:nroExp')
                } else {
                    res.render('armado', { 'empresas' : results[0].empresas, 'usuario' : req.session.user, 'nroExp' : nroExp })
                }
              })
        } else {
            res.redirect('/');  
        }
    }