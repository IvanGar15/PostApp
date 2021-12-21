const Sequelize = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(
    config.database, 
    config.user, 
    config.password, 
    {
        host: config.host,
        dialect: 'mysql'
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a BD')
    })
    .catch(err => {
        console.log('No se conecto')
    })

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;