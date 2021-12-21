const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth');

router.post(
    '/signup',
    [
        body('user').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Debe tener el formato de correo.')
        .custom(async (email) => {
            const user = await User.findByEmail(email);
            var lengthOfUser = Object.keys(user).length; 
            if(lengthOfUser > 0){
                console.log("El correo ingresado ya está registrado!");
                return Promise.reject('El correo ingresado ya está registrado!');
            }
        })
        .normalizeEmail(),
        body('password').trim().isLength({min: 6})
    ], 
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;