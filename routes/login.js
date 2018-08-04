var express = require('express');
var router = express.Router();
var md5 = require('md5');
var User = require('../public/models/modelUsuario').User;

router.get('/', function(req, res) {
  if(req.session.user){
    res.render('index', { usuario : req.session.user });
  } else {
    res.render('errorlog')
  }
});

router.post('/', function(req, res) {
  var user = req.body.user;
  var pass = md5(req.body.pass);

  User.find({ 'user' : user, 'pass' : pass}, function(err, results){
    if(results.length == 0 ) {
      if(err) throw err;
      res.render('errorlog')
    } else {
      req.session.user=req.body.user;
      req.session.pass=req.body.pass;
      res.redirect("/")
    }
  });
});

module.exports = router;