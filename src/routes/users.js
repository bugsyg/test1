const express = require('express');
const router = express.Router();

const User = require('../models/User')

router.get('/users/signin', (req,res)=>{
    res.render('users/signin');
})

router.get('/users/signup', (req,res)=>{
    res.render('users/signup');
})

router.post('/users/signup', async (req,res)=>{
    const { name, email, password, confirm_password} = req.body;
    const errors= [];
    if (name.length <= 0 ) {
        errors.push({text:'Insertar un nombre'})
    }
    if (password != confirm_password) {
        errors.push({text:'Las Constraseñas no coinciden'})
    }
    if (password.length < 8 ) {
        errors.push({text:'La contrseña debe tener al menos 8 caracteres'})
    }
    if (errors.length > 0 ) {
        res.render('users/signup', {errors, name, email, password, confirm_password})
    } else{
        const emailUser = await User.findOne ({email: email})
        if (emailUser) {
            req.flash('error_msg', 'Ese Correo ya está en uso')
            res.redirect('users/signup');
        }
        const newUser = new User({name, email, password})
        await newUser.encryptPassword(password);
        await newUser.save()
        res.redirect('/users/signin')
    }
    
})

module.exports = router;