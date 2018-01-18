//##################################################
//SEQUELIZE une table ainsi que des champs - produit
//Fonctionnelle
//##################################################

var sequelize = require('../base.js');
const Sequelize = require('sequelize');

const Produit = sequelize.define('produit', {
  nomProduit: Sequelize.STRING,
  descriptionProduit: Sequelize.STRING,
  prixProduit: Sequelize.INTEGER,
  quantiteProduit: Sequelize.INTEGER
}
, {
  tableName : 'produit',
  createdAt : 'sys_created',
  updatedAt : 'sys_modified',
  deletedAt : false,
  freezeTableName : true
});

Produit.sync();

module.exports = Produit;
