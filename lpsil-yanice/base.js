//#######################################//
//Instanciation BDD via sequelize 
//Fonctionnelle
//#######################################//


const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejsbdd', 'yanice', 'gto', {
	host: 'localhost',
	dialect: 'mysql',
	
	
})

module.exports = sequelize;