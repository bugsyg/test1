const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String},
    duracion: {type: String, default: "30 minutos"},
    mensaje: {type: String, default: null},
    horas: {type: Number, default: null},
    minutos: {type: Number, default: null},
    dia: {type: Date, default: null},
    horaInicio:{type: Date, default: null},
    horaFin:{type: Date, default: null},
})

module.exports = mongoose.model('Note', NoteSchema)