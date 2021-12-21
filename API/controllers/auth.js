const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async(req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return

    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const hashedPassword = await bcrypt.hash(password, 12)

        const userData = {
            user: user,
            email: email,
            password: hashedPassword
        }
        const result = await User.save(userData);
    

        res.status(201).json({message: 'Usuario registrado'})
    }catch(error){
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
};

exports.login = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findByEmail(email);
        var lengthOfUser = Object.keys(user).length; 
        
        if(lengthOfUser !== 1){
            const error = new Error('No hay ningún usuario registrado con este correo.')
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0];
        const isEqual = await bcrypt.compare(password, storedUser.password);

        if(!isEqual){
            const error = new Error('La contraseña es incorrecta.')
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                email: storedUser.email,
                userId: storedUser.id,
            },
            'secretfortoken',
            {expiresIn: '1h'}
        );

        res.status(200).json({token: token, userId: storedUser.id});

    } catch(error){
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
}