var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
require('./base.js');
var app = express();
var user = require('./modele/user.js');
var userController = require('./controller/user.js');
var produit = require('./modele/produit.js');
var produitController = require('./controller/produit.js');
var session = require('express-session');

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

logger.info('server start');

app.get('/', function(req, res){
    res.redirect('/connexion');
});

app.get('/connexion', function(req,res){
	res.render('connexion');
});

app.get('/inscription', function(req,res){
	res.render('inscription');
});

app.get('/ping', function(req, res){
    res.send('ping');
});

app.get('/home', produitController.getProduit);

app.get('/suppressionProduit', produitController.getProduitForDelete);

app.get('/profil', function(req, res){
    var id = req.query.id;
    var nom = req.query.nom;
    var prenom = req.query.prenom;
    var email = req.query.email;
    res.render('profil', {id: id, nom: nom, prenom: prenom, email: email});
});

app.get('/modificationMdp', function(req, res){
    res.render('modificationMdp');
});

app.get('/connexionAdministrateur', function(req, res){
    res.render('connexionAdministrateur');
});

app.get('/panneauAdministrateur', function(req, res){
    res.render('panneauAdministrateur');
});

app.get('/ajoutProduit', function(req, res){
    res.render('ajoutProduit');
});

app.get('/deconnexion', function(req, res){
    res.render('deconnexion');
});

/*app.get('/deconnexion', function(req, res){ 

  req.session.destroy();
  res.send('<br />logged out!<br /><a href="/user">Check Session</a>');
  res.render('deconnexion');
  req.session.destroy();
  res.send('<br />logged out!<br /><a href="/user">Check Session</a>');
});*/

app.get('/suppressionUtilisateur', userController.getAllUsers);

app.post('/connexion',userController.connect)

app.post('/inscription',userController.inscription)

app.post('/home',userController.getProfil)

app.post('/profil',userController.modifProfil)

app.post('/modificationMdp',userController.changerMdp)

app.post('/connexionAdministrateur', userController.connectAdmin)

app.post('/ajoutProduit', produitController.ajout)

app.post('/suppressionUtilisateur', userController.suprUsers)

app.post('/suppressionProduit', produitController.suprProduit)

app.post('/deconnexion', userController.disc)

app.listen(process.env.PORT || 1314);

// app.delete('', userController.suprr)
