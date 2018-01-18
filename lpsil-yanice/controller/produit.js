var Produit = require('../modele/produit.js');
var sequelize = require('../base.js');

//#############################################################################################
//Fonction ajout, créer l'objet produit à partir des données produit, panneau admin le récupére 
//Fonctionnelle
//#############################################################################################

module.exports.ajout = function(req,res){
	//console.log(req.body);
  Produit.create({
  	nomProduit: req.body.nomProduit,
    descriptionProduit: req.body.descriptionProduit,
  	prixProduit: req.body.prixProduit,
  	quantiteProduit: req.body.quantiteProduit
  }).then(produit => {
    res.render('panneauAdministrateur');
  })
}

//###################################################################################################################
//Suppression d'un produit, détruit l'objet produit en question et le retourne à panneau admin, erreur en cas d'échec 
//Fonctionnelle
//###################################################################################################################

module.exports.suprProduit = function(req,res){

  Produit.destroy({
    where: { id: req.body.idProduit }
  }).then(produit=> {
    res.render('panneauAdministrateur');
  }).catch(function(err){
    res.render("error",{result: "Erreur: suppression de l'article non effectué"});
  });
}


//###########################################################################################################################
//Récupére le produit enregistré dans la BDD (produit) puis liste dans une liste de produit pour l'afficher sur la page index
//Fonctionnelle 
//###########################################################################################################################

module.exports.getProduit = function(req,res){

	sequelize.query("SELECT * FROM `produit`", { type: sequelize.QueryTypes.SELECT})
	.then(listeProduit=> {
		res.render("home", {listeProduit: listeProduit});
	})
}


//###############################################################################
//Supprime la liste de produit précédemment créer en cas de destruction du produit
//Fonctionnelle
//##############################################################################

module.exports.getProduitForDelete = function(req,res){

	sequelize.query("SELECT * FROM `produit`", { type: sequelize.QueryTypes.SELECT})
	.then(listeProduitForDelete=> {
		res.render("suppressionProduit", {listeProduitForDelete: listeProduitForDelete});
	})
}
