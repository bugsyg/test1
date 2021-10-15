const express = require('express');
const router = express.Router();

router.get('/notes/add', (req,res)=>{
    res.render('Notas');
})

router.get('/notes', (req,res)=>{
    res.send('Notas');
})


module.exports = router;