const db = require('../utils/database');
const Sequelize = require('sequelize');

const User = db.sequelize.define('Usuarios', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    },
    user: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
})

User.findByEmail = function(email){
    var find = {};
    find = db.sequelize.query("SELECT * FROM usuarios WHERE email = ?", 
    {replacements: [email], type: db.sequelize.QueryTypes.SELECT});
    return find;
}

User.save = function(user){
    const create = User.create({
        user: user.user, email: user.email, password: user.password
    });
    return create;
}

module.exports = User;