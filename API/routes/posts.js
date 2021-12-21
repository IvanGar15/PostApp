const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const Post = require('../models/posts');
const postsController = require('../controllers/posts');
const auth = require('../middleware/auth');

router.get('/', auth, postsController.findAll);

router.post(
    '/',
    [
        auth,
        body('title').trim().isLength({min:1}).not().isEmpty(),
        body('content').trim().isLength({min:1}).not().isEmpty(),
        body('user').trim().not().isEmpty(),
    ], 
    postsController.postPost
);

router.delete('/:id', auth, postsController.deletePost);

module.exports = router;