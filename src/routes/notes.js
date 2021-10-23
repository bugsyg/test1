const express = require('express');
const router = express.Router();
const Note = require("../models/Note") 
const { isAuthenticated } = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req,res)=>{
    res.render('notes/new-note');
})

router.post('/notes/new-note', isAuthenticated, async (req,res)=>{
    const {title, fijo, cuando, duracion, limite, caracter, dia}=req.body
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
        const newNote = new Note({title, fijo, cuando, duracion, limite, caracter, dia})
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
    const hoy = new Date("2021-10-23T00:00:00.000+00:00")
    const notes = await Note.find({user: req.user.id}).lean().sort({date:'desc'});
    res.render('notes/all-notes', { notes })
})
router.get('/notes/hoy', isAuthenticated, async (req,res)=>{
    const hoy = new Date("2021-10-23T00:00:00.000+00:00")
    const notes = await Note.find({user: req.user.id, dia: {$gt: new Date(hoy.getTime()), $lt:(hoy.getTime() + 1000 * 86300 * 2)}}).lean().sort({date:'desc'});
    res.render('notes/hoy', { notes })
})
router.get('/notes/manana', isAuthenticated, async (req,res)=>{
    const hoy = new Date("2021-10-23T00:00:00.000+00:00")
    const notes = await Note.find({user: req.user.id, dia: {$gt: new Date(hoy.getTime() + 1000 * 86300 * 1), $lt:(hoy.getTime() + 1000 * 86400 * 2)}}).lean().sort({date:'desc'});
    res.render('notes/esta-semana', { notes })
})


module.exports = router;