const express = require('express');
const router = express.Router();

router.get('/users/signin', (req,res)=>{
    res.render('users/signin');
})

router.get('/users/signup', (req,res)=>{
    res.render('users/signup');
})

router.post('/users/signup', (req,res)=>{
    res.send('ok');
})

module.exports = router;