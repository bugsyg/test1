const express = require('express');
const router = express.Router();
const Note = require("../models/Note") 
const { isAuthenticated } = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req,res)=>{
    res.render('notes/new-note');
})

router.post('/notes/new-note', isAuthenticated, async (req,res)=>{
    const {title, fijo, cuando, duracion, limite, caracter}=req.body
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
        const newNote = new Note({title, fijo, cuando, duracion, limite, caracter})
        newNote.user = req.user.id;
        if (newNote.fijo === "No"){
            if(newNote.caracter=="Estudio"){
                if(parseInt(newNote.duracion, 10)>120 && newNote.limite==="No"){
                    newNote.duracion="120";
                }
                if(parseInt(newNote.cuando, 10) < 1000 || parseInt(newNote.cuando, 10) > 2200){
                    newNote.cuando="1000";
                }
                if(parseInt(newNote.cuando, 10) > 1400 && parseInt(newNote.cuando, 10) < 1600){
                    newNote.cuando="1600";
                }
            
            }
            else if(newNote.caracter=="Ejercicio"){
                if(parseInt(newNote.duracion, 10)>30 && newNote.limite==="No"){
                duracion="30";
                }
                if(parseInt(newNote.cuando, 10) < 1400 || parseInt(newNote.cuando, 10) > 1800){
                    newNote.cuando="1500";
                }
            }
            else if(newNote.caracter=="Alimentacion"){
                if(parseInt(newNote.duracion, 10)<30){
                    newNote.duracion="30";
                }
                if(parseInt(cuando, 10) < 930){
                    newNote.cuando="930";
                }
                if(parseInt(newNote.cuando, 10) > 11 && parseInt(newNote.cuando, 10) < 15){
                    newNote.cuando="13";
                }
                if(parseInt(newNote.cuando, 10) > 1900){
                    newNote.cuando="2030";
                }
        }
        await newNote.save()
        res.redirect('/notes')    
    }
    
}})

router.delete('/notes/delete/:id', isAuthenticated, async (req,res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes')   
});

router.get('/notes', isAuthenticated, async (req,res)=>{
    const notes = await Note.find({user: req.user.id}).lean().sort({date:'desc'});
    res.render('notes/all-notes', { notes })
})


module.exports = router;