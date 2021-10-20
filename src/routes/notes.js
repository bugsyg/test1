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
        if (fijo === "No"){
            if(caracter=="Estudio"){
                if(parseInt(duracion, 10)>120 && limite==="No"){
                    const Rduracion="120";
                }
                if(parseInt(cuando, 10) < 1000 || parseInt(cuando, 10) > 2200){
                    const Rcuando="1000";
                }
                if(parseInt(cuando, 10) > 1400 && parseInt(cuando, 10) < 1600){
                    const Rcuando="1600";
                }
            
            }
            else if(caracter=="Ejercicio"){
                if(parseInt(duracion, 10)>30 && limite==="No"){
                    const Rduracion="30";
                }
                if(parseInt(cuando, 10) < 1400 || parseInt(cuando, 10) > 1800){
                    const Rcuando="1500";
                }
            }
            else if(caracter=="Alimentacion"){
                if(parseInt(duracion, 10)<30){
                    const Rduracion="30";
                }
                if(parseInt(cuando, 10) < 930){
                    const Rcuando="930";
                }
                if(parseInt(cuando, 10) > 1100 && parseInt(cuando, 10) < 1500){
                    const Rcuando="1300";
                }
                if(parseInt(cuando, 10) > 1900){
                    const Rcuando="2030";
                }
        }}
        const newNote = new Note({title, fijo, cuando, duracion, limite, caracter, Rcuando, Rduracion})
        newNote.user = req.user.id; 
        await newNote.save()
        res.redirect('/notes')    
    }
}
)

router.delete('/notes/delete/:id', isAuthenticated, async (req,res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes')   
});

router.get('/notes', isAuthenticated, async (req,res)=>{
    const notes = await Note.find({user: req.user.id}).lean().sort({date:'desc'});
    res.render('notes/all-notes', { notes })
})


module.exports = router;