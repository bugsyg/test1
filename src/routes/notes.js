const express = require('express');
const router = express.Router();
const Note = require("../models/Note")

router.get('/notes/add', (req,res)=>{
    res.render('notes/new-note');
})

router.post('/notes/new-note', (req,res)=>{
    const {title}=req.body
    const errors= [];
    if(!title){
        errors.push({text: 'escribir titulo'})
    }
    if(errors.length>0){
        res.render('notes/new-note', {
            errors, 
            title
        });
    }else{
        const newNote = new Note({title})
        newNote.save().then(res.redirect('/notes'))
           
    }
    
})

router.get('/notes', (req,res)=>{
    res.send('Notas');
})


module.exports = router;