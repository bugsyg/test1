const express = require('express');
const router = express.Router();
const Note = require("../models/Note")

router.get('/notes/add', (req,res)=>{
    res.render('notes/new-note');
})

router.post('/notes/new-note', async (req,res)=>{
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
        try{const newNote = new Note({title})
        await newNote.save()
        res.redirect('/notes')}
        catch (err){
            next(err)
        }
            
    }
    
})

router.get('/notes', (req,res)=>{
    res.send('Notas');
})


module.exports = router;