var Proveedor = require('../public/models/modelProveedor').Proveedor;


exports.inicio = function(req, res) {
    if(req.session.user){         
    res.render('alta', {'usuario' : req.session.user})
    } else {
      res.redirect('/')
    }
}

exports.recibirDatos = function(req, res, next) {
    var user = new Proveedor({  
      'nombre' : req.body.nombre,
      'cuit' : req.body.cuit,
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
         res.send('Error al intentar guardar el proveedor, intentelo nuevamente.'); //ver de poner algo mas copado
      } else { 
        res.redirect('/')
      }
    });
  }
