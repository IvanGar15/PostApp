const { validationResult } = require("express-validator");
const Post = require('../models/posts');

exports.findAll = async(req, res, next) => {
    try {
        const allPost = await Post.findAll();
        res.status(200).json(allPost);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
};

exports.postPost = async(req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return

    const title = req.body.title;
    const content = req.body.content;
    const user = req.body.user;

    try{
        const post = {
            title: title,
            content: content,
            user: user
        };

        const result = await Post.save(post);
        res.status(201).json({message: 'Post creado'})
    }catch(error){
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
};

exports.deletePost = async(req, res, next) => {
    try {
        const deleteResponse = await Post.delete(req.params.id)
        res.status(200).json(deleteResponse);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
};