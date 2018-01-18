//###############################################
//SEQUELIZE une table ainsi que des champs - User
//Fonctionnelle
//###############################################

var sequelize = require('../base.js');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
	nom: Sequelize.STRING,
	prenom: Sequelize.STRING,
	mdp: Sequelize.STRING,
	email: Sequelize.STRING,
	admin: Sequelize.INTEGER
}
, {
  tableName : 'user',
  createdAt : 'sys_created',
  updatedAt : 'sys_modified',
  deletedAt : false,
  freezeTableName: true
});

User.sync();

module.exports = User;
