const db = require('../utils/database');
const Sequelize = require('sequelize');

const Posts = db.sequelize.define('Posts', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    flag: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    user: {
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id',
        }
    }
})

Posts.findAll = function(){
    var find = {};
    find = db.sequelize.query("SELECT * FROM posts INNER JOIN usuarios ON posts.id = usuarios.id", 
    {type: db.sequelize.QueryTypes.SELECT});
    return find;
};

Posts.save = function(post){
    const create = Posts.create({
        title: post.title, content: post.content, user: post.user
    });
    return create;
}

Posts.delete = function(idPost){
    const deleted = Posts.update({
        flag: 1,
    },{
        where: {
            id: idPost
        }
    })
    return deleted;
}

module.exports = Posts;