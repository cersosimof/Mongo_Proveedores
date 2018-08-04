var express = require('express');
var router = express.Router();


module.exports = (req, res, next) => {
    var nroExp = req.body.nroExp;
    var empresa = req.body.empresa;

    // User.find({ 'user' : user, 'pass' : pass}, function(err, results){ //ver que onda
    // //busca parciales con /lodeaca/

    var buscar = "%"+empresa+"%";
    pool.query('SELECT idEmpresa FROM proveeores WHERE nombre LIKE ?',[buscar], (err, results) => {
    if(err) throw err;                  
    if (results.length == 0){
    console.log("no hay resultados")

    } else {

        for (var i = 0; i < results.length; i++){
            var empresa = results[i].idEmpresa;
            pool.query('INSERT INTO listadoexpediente(nroExpediente, idEmpresa) VALUES (?, ?)', [nroExp, empresa], (err, results) => {
            if(err) throw err;
            console.log('Empresa nueva Agregada')     
            })
        }
        res.redirect("armar/"+nroExp)
    }
})
}