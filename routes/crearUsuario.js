
var express = require('express');
var router = express.Router();
var md5 = require('md5');
var User = require('../public/models/modelUsuario').User;

router.post('/', function(req, res) {          
var user = new User({ 'user' : req.body.newUser, 'pass' : md5(req.body.newPass) })
user.save();
res.redirect('/');     
})
module.exports = router;