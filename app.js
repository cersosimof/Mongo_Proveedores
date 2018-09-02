var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// mongoose.connect("mongodb://localhost/proveedores");
mongoose.connect('mongodb://cherso88:espora1436@ds213472.mlab.com:13472/provcrud', { useNewUrlParser : true });

//RUTAS
var indexRouter = require('./routes/index');
var altaRuta = require('./routes/alta');
var modifRuta = require('./routes/modificar')
var armarRuta = require('./routes/armar')
var verRuta = require('./routes/ver');
var eliminarRuta = require('./routes/eliminar')
var loginRuta = require('./routes/login');
var logoutRuta = require('./routes/logout');
var feedbackRuta = require('./routes/feedback')
var crearUsuario = require('./routes/crearUsuario')
//AJAX
var buscarRamo = require('./public/javascripts/buscarRamos')
var buscarEmpresa = require('./public/javascripts/buscarEmpresa')

var agregarRuta = require('./public/javascripts/agregarEmpresa')
var eliminarRuta = require('./public/javascripts/eliminarEmpresa')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'poronga',
  store: new MongoStore({
    // url: 'mongodb://localhost/proveedores',   
    url: 'mongodb://cherso88:espora1436@ds213472.mlab.com:13472/provcrud',
    ttl: 14 * 24 * 60 * 60,
    resave: true,
    saveUninitialized: true // = 14 days. Default
  })
}));

//RUTAS
app.use('/', indexRouter);

// ### ARMAR ### 
app.get('/alta', altaRuta.inicio)
app.post('/alta', altaRuta.recibirDatos)

// ### MODIFICAR ###
app.get('/modificar', modifRuta.inicio)
app.post('/modificar', modifRuta.inicioP)
app.get('/modificar/:empresa', modifRuta.empresa)
app.post('/modificar/:empresa/update', modifRuta.modificar)

// ### ARMAR ### 
app.get('/armar', armarRuta.inicio)
app.post('/armar', armarRuta.inicio1)
app.get('/armar/:nroExp', armarRuta.mostrar)

// ### VER ###
app.get('/ver', verRuta.inicio);
app.post('/ver', verRuta.inicioP);
app.get('/ver/:ramo', verRuta.mostrar);

// ### FEEDBACK ###
app.get('/feedback', feedbackRuta.select);
app.get('/feedback/:nroExp', feedbackRuta.listado);
app.post('/feedback/:nroExp', feedbackRuta.enviar1, feedbackRuta.enviar2);













app.use('/login', loginRuta);
app.use('/logout', logoutRuta)
app.use('/crearUsuario', crearUsuario)

//AJAX
app.post('/buscarRamo', buscarRamo )
app.post('/buscarEmpresas', buscarEmpresa)

app.post('/agregar', agregarRuta)
app.get('/eliminar/:nroExp/:empresa', eliminarRuta)

app.get('/errorlog', function (req, res) {res.render('errorlog')});

// ERRORES
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
