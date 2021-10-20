const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String},
    fijo: {type: String, default: null},
    duracion: {type: Number, default: null},
    limite: {type: String, default: null},
    caracter: {type: String, default: null},
    cuando: {type: Number, default: null},
    Rcuando: {type: String, default: null},
    Rduracion: {type: String, default: null},
})

module.exports = mongoose.model('Note', NoteSchema)