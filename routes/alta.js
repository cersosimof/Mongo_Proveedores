var express = require('express');
var router = express.Router();
var Proveedor = require('../public/models/modelProveedor').Proveedor;


router.get('/', function(req, res) {
    if(req.session.user){         
    res.render('alta', {'usuario' : req.session.user})
    } else {
      res.redirect('/')
    }
})

router.post('/', function(req, res, next) {
    var user = new Proveedor({  
      'nombre' : req.body.nombre,
      'correo' : req.body.correo,
      'telefono' : req.body.telefono,
      'contacto' : req.body.contacto,
      'ramo' : req.body.ramo.toLowerCase(),
      'invitado' : 0,
      'cotizo' : 0,
      'prom' : 0
 })
    user.save(function(err, doc){
      if(err) {
         res.send('Error al intentar guardar el proveedor.'); //ver de poner algo mas copado
      } else { 
        res.render('alta', {'altaOk' : 'Proveedor ingresado en la base de datos', 'usuario' : req.session.user })
      }
    });
  })

module.exports = router;
