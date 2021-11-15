const express = require('express');
const router = express.Router();
const Note = require("../models/Note") 
const { isAuthenticated } = require('../helpers/auth')
const moment= require('moment') 

router.post('/notes/new-note', isAuthenticated, async (req,res)=>{
    const {title, dia, date, fijo, duracion, caracter, horario}=req.body
    const errors= [];
    const tareas = await Note.find({user: req.user.id}).lean().sort({date:'desc'});
    var recomendado= [];
    var espacio = [];
    var comienzo, comienzo1, final0, final1;
    var corroborar;
    var corroborar2;
    var corroborar3;
    var finaltiempo;
    var horaInicio;
    var horaFin;
    var mensaje;
    var hrr = horario.split(":");
    var horas = parseInt(hrr[0]);
    var minutos = parseInt(hrr[1]);

    if(!title){
        errors.push({text: 'escribir titulo'})
    }
    if(errors.length>0){
        res.render('notes/all-notes', {
            errors, 
            title
        });
    }else{ if(dia){
        function recomendadadar(caracter) {
            switch (caracter) {
                case "Ejercicio":
                    comienzo = moment(dia).add(14, 'hours');
                    final0 = moment(dia).add(18, 'hours');
        
                    recomendado.push(comienzo, final0);
                    break;
                case "Estudio":
                    comienzo = moment(dia).add(7, 'hours');
                    final0 = moment(dia).add(14, 'hours');
        
                    comienzo1 = moment(dia).add(16, 'hours');
                    final1 = moment(dia).add(22, 'hours');
        
                    recomendado.push(comienzo, final0);
                    recomendado.push(comienzo1, final1);
                    
                    break;
                case "Ocio":
                    comienzo = moment(dia).add(18, 'hours');
                    final = moment(dia).add(22, 'hours');
        
                    recomendado.push(comienzo, final0);
                    break;
                case "Alimentacion":
                    var hor =parseInt(horas)
        
                    if (hor < 11) {
                        comienzo = moment(dia).add(8, 'hours');
                        final0 = moment(dia).add(9, 'hours').add(30, 'minutes');
                        
                    }
                    if (hor > 11 && hor < 17) {
        
                        comienzo = moment(dia).add(13, 'hours');
                         final0 = moment(dia).add(15, 'hours');
        
                    }
                    if (hor > 17) {
                        comienzo = moment(dia).add(20, 'hours');
                        final0 = moment(dia).add(21, 'hours').add(30, 'minutes');
        
                    }
                     recomendado.push(comienzo, final0);
                    break;
            }
        }
        function getDaterange(start, end, arr) {
            if (!moment(start).isSameOrAfter(end)) {
               if (arr.length==0) arr.push(moment(start));
               var next = moment(start).add(1, 'minutes');
               arr.push(next);
               getDaterange(next, end, arr);
            } else {
               return arr;
            }
            return arr;
         }

         if (fijo === "Si") {
            horaInicio = moment(dia).add(horas, 'hours').add(minutos, 'minutes')
            horaFin = moment(dia).add(horas, 'hours').add(minutos, 'minutes').add(duracion, 'minutes')
            inicio = horaInicio.format("HH:mm");
            final =horaFin.format("HH:mm");
        }  else {
            recomendadadar(caracter);
            var tiem = parseInt(duracion);
                var vacio0 = getDaterange(recomendado[0], recomendado[1], []);
                 var vacio1 = getDaterange(recomendado[2], recomendado[3], [])
                 var vacio = vacio0.concat(vacio1);
            
            for (let i = 0; i < tareas.length; i++) {
                for (let index = 0; index < vacio.length; index++) {
                    if (vacio[index].isBetween(tareas[i].horaInicio, tareas[i].horaFin) || vacio[index].isSame(tareas[i].horaInicio) || vacio[index].isSame(tareas[i].horaFin)){
                        espacio.push(vacio[index]);
                        continue;
                    }
                }
            } for (let a = 0; a < vacio.length; a++) {
                for (let b = 0; b < espacio.length; b++) {
                    if (espacio[b] == vacio[a]) {
                        vacio.splice([a], 1)
                    }
    
                }
    
            }
             tiem = parseInt(duracion);
             if (vacio.length>tiem) {
                
            
            for (let c = 0; c < vacio.length; c++) {
                    
                if(vacio[c+tiem] != undefined){
    
                    corroborar3 = vacio[c+tiem];
    
                }
                    corroborar = vacio[c];
                    
            corroborar2 = moment(corroborar).add(tiem, "minutes");
    
            if (corroborar2.format("HHmm") != corroborar3.format("HHmm")){
                         vacio.splice(c, 1);
                    c--;
                    }
    
    
            }console.log(vacio)
            if(vacio.length > 0){

            horaInicio = moment(vacio[(Math.floor(vacio.length/2))]);
            
                finaltiempo = moment(vacio[(Math.floor(vacio.length/2))]);
                horaFin = finaltiempo.add(tiem, "minutes")
                inicio = horaInicio.format("HH:mm");
                final =horaFin.format("HH:mm");
            } else{horaInicio = null;
                horaFin = null;
                inicio = null;
                final = null;}
    } else{
        horaInicio = null;
         horaFin = null;
         inicio = null;
         final = null;
    }}
    if (inicio == null) {
        mensaje = " La tarea es demasiado extensa, recórtala, elmina otras, o prueba introducirla manualmente"
    } else if (inicio){
        mensaje = "De " + inicio + " a " + final;
    }

    
    }else{
        horaInicio = null;
         horaFin = null;
         inicio = null;
         final = null;}
         if (horario) {  
            var hasta = moment(hoy).add(horas, 'hours').add(minutos, 'minutes').add(duracion, 'minutes')
            hasta = hasta.format("HH:mm")   
        } else if(!horario){
            var hasta = null;
        }
         

        const newNote = new Note({title, dia, date, hasta, horario, horaInicio, horaFin, mensaje})
        newNote.user = req.user.id; 
        await newNote.save()
        res.redirect('/notes')    
    }
})
router.post('/notes/new-note/cualquier', isAuthenticated, async (req,res)=>{
    const {title, date}=req.body
    const errors= [];

    if(!title){
        errors.push({text: 'escribir titulo'})
    }
    if(errors.length>0){
        res.render('notes/cualquier', {
            errors, 
            title
        });
    }else{
        const newNote = new Note({title, date, dia: null})
        newNote.user = req.user.id; 
        await newNote.save()
        res.redirect('/notes/cualquier')    
    }
})
router.post('/notes/new-note/hoy', isAuthenticated, async (req,res)=>{
    const {title, date, duracion, caracter, horario}=req.body
    const errors= [];
    var hoy = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
    var recomendado= [];
    var espacio = [];
    var comienzo, comienzo1, final0, final1;
    var corroborar;
    var corroborar2;
    var corroborar3;
    var finaltiempo;
    var horaInicio;
    var horaFin;
    var mensaje;
    var hrr = horario.split(":");
    var horas = parseInt(hrr[0]);
    var minutos = parseInt(hrr[1]);

    if(!title){
        errors.push({text: 'escribir titulo'})
    }
    if(errors.length>0){
        res.render('notes/hoy', {
            errors, 
            title
        });
    }else{
        function recomendadadar(caracter) {
            switch (caracter) {
                case "Ejercicio":
                    comienzo = moment(hoy).add(14, 'hours');
                    final0 = moment(hoy).add(18, 'hours');
        
                    recomendado.push(comienzo, final0);
                    break;
                case "Estudio":
                    comienzo = moment(hoy).add(7, 'hours');
                    final0 = moment(hoy).add(14, 'hours');
        
                    comienzo1 = moment(hoy).add(16, 'hours');
                    final1 = moment(hoy).add(22, 'hours');
        
                    recomendado.push(comienzo, final0);
                    recomendado.push(comienzo1, final1);
                    
                    break;
                case "Ocio":
                    comienzo = moment(hoy).add(18, 'hours');
                    final = moment(hoy).add(22, 'hours');
        
                    recomendado.push(comienzo, final0);
                    break;
                case "Alimentacion":
                    var hor =parseInt(horas)
        
                    if (hor < 11) {
                        comienzo = moment(hoy).add(8, 'hours');
                        final0 = moment(hoy).add(9, 'hours').add(30, 'minutes');
                        
                    }
                    if (hor > 11 && hor < 17) {
        
                        comienzo = moment(hoy).add(13, 'hours');
                         final0 = moment(hoy).add(15, 'hours');
        
                    }
                    if (hor > 17) {
                        comienzo = moment(hoy).add(20, 'hours');
                        final0 = moment(hoy).add(21, 'hours').add(30, 'minutes');
        
                    }
                     recomendado.push(comienzo, final0);
                    break;
            }
        }
        function getDaterange(start, end, arr) {
            if (!moment(start).isSameOrAfter(end)) {
               if (arr.length==0) arr.push(moment(start));
               var next = moment(start).add(1, 'minutes');
               arr.push(next);
               getDaterange(next, end, arr);
            } else {
               return arr;
            }
            return arr;
         }

         if (fijo === "Si") {
            horaInicio = moment(hoy).add(horas, 'hours').add(minutos, 'minutes')
            horaFin = moment(hoy).add(horas, 'hours').add(minutos, 'minutes').add(duracion, 'minutes')
            inicio = horaInicio.format("HH:mm");
            final =horaFin.format("HH:mm");
        }  else {
            recomendadadar(caracter);
            var tiem = parseInt(duracion);
                var vacio0 = getDaterange(recomendado[0], recomendado[1], []);
                 var vacio1 = getDaterange(recomendado[2], recomendado[3], [])
                 var vacio = vacio0.concat(vacio1);
            
            for (let i = 0; i < tareas.length; i++) {
                for (let index = 0; index < vacio.length; index++) {
                    if (vacio[index].isBetween(tareas[i].horaInicio, tareas[i].horaFin) || vacio[index].isSame(tareas[i].horaInicio) || vacio[index].isSame(tareas[i].horaFin)){
                        espacio.push(vacio[index]);
                        continue;
                    }
                }
            } for (let a = 0; a < vacio.length; a++) {
                for (let b = 0; b < espacio.length; b++) {
                    if (espacio[b] == vacio[a]) {
                        vacio.splice([a], 1)
                    }
    
                }
    
            }
             tiem = parseInt(duracion);
             if (vacio.length>tiem) {
                
            
            for (let c = 0; c < vacio.length; c++) {
                    
                if(vacio[c+tiem] != undefined){
    
                    corroborar3 = vacio[c+tiem];
    
                }
                    corroborar = vacio[c];
                    
            corroborar2 = moment(corroborar).add(tiem, "minutes");
    
            if (corroborar2.format("HHmm") != corroborar3.format("HHmm")){
                         vacio.splice(c, 1);
                    c--;
                    }
    
    
            }console.log(vacio)
            if(vacio.length > 0){

            horaInicio = moment(vacio[(Math.floor(vacio.length/2))]);
            
                finaltiempo = moment(vacio[(Math.floor(vacio.length/2))]);
                horaFin = finaltiempo.add(tiem, "minutes")
                inicio = horaInicio.format("HH:mm");
                final =horaFin.format("HH:mm");
            } else{horaInicio = null;
                horaFin = null;
                inicio = null;
                final = null;}
    } else{
        horaInicio = null;
         horaFin = null;
         inicio = null;
         final = null;
    }}
    if (inicio == null) {
        mensaje = " La tarea es demasiado extensa, recórtala, elmina otras, o prueba introducirla manualmente"
    } else if (inicio){
        mensaje = "De " + inicio + " a " + final;
    }
    if (horario) {  
        var hasta = moment(hoy).add(horas, 'hours').add(minutos, 'minutes').add(duracion, 'minutes')
        hasta = hasta.format("HH:mm")   
    } else if(!horario){
        var hasta = null;
    }

        const newNote = new Note({title, date, dia: hoy, hasta, horario, horaInicio, horaFin, mensaje})
        newNote.user = req.user.id; 
        await newNote.save()
        res.redirect('/notes/hoy')    
    }
})
router.post('/notes/new-note/semana', isAuthenticated, async (req,res)=>{
    const {title, date}=req.body
    const errors= [];

    if(!title){
        errors.push({text: 'escribir titulo'})
    }
    if(errors.length>0){
        res.render('notes/esta-semana', {
            errors, 
            title
        });
    }else{
        var d = new Date();
        var semana = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]')
        const newNote = new Note({title, date, dia: new Date(semana).getTime()+ 1000 * 86400 * 7});
        newNote.user = req.user.id; 
        await newNote.save()
        res.redirect('/notes/semana')    
    }
})

router.delete('/notes/delete/:id', isAuthenticated, async (req,res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes')   
});

router.get('/notes', isAuthenticated, async (req,res)=>{
    const notes = await Note.find({user: req.user.id}).lean().sort({date:'desc'});
    res.render('notes/all-notes', { notes })
})
router.get('/notes/add', isAuthenticated, async (req,res)=>{
    res.render('notes/add')
})
router.get('/notes/hoy', isAuthenticated, async (req,res)=>{
    var hoy = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
    var d = new Date();
    var manana = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]')
    const notes = await Note.find({user: req.user.id, dia: {$gt: new Date(hoy).getTime()-1, $lt:(new Date(hoy).getTime()+ 1000 * 86300 * 1)}}).lean().sort({date:'desc'});
    res.render('notes/hoy', { notes })
})
router.get('/notes/semana', isAuthenticated, async (req,res)=>{
    var hoy = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
    const notes = await Note.find({user: req.user.id, dia: {$gt: new Date(hoy).getTime()+1, $lt:new Date(hoy).getTime()+ 1000 * 86401 * 7}}).lean().sort({date:'desc'});
    res.render('notes/esta-semana', { notes })
})
router.get('/notes/cualquier', isAuthenticated, async (req,res)=>{
    const notes = await Note.find({user: req.user.id, dia: null}).lean().sort({date:'desc'});
    res.render('notes/sin-fecha', { notes })
})


module.exports = router;