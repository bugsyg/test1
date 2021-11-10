const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String},
    duracion: {type: String, default: "30 minutos"},
    caracter: {type: String, default: "Estudio"},
    horas: {type: Number, default: null},
    minutos: {type: Number, default: null},
    dia: {type: Date, default: null},
    horaInicio:{type: Date, default: null},
    horaFin:{type: Date, default: null},
    inicio: {type: String},
    final: {type: String}
})

module.exports = mongoose.model('Note', NoteSchema)