const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String},
    mensaje: {type: String, default: null},
    mensajeReides: {type: String, default: null},
    dia: {type: Date, default: null},
    horaInicio:{type: Date, default: null},
    horaFin:{type: Date, default: null},
    diadesemana:{type: String, default: null}
})

module.exports = mongoose.model('Note', NoteSchema)