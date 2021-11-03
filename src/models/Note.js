const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String},
    fijo: {type: String, default: "No"},
    duracion: {type: String, default: "30 minutos"},
    limite: {type: String, default: null},
    caracter: {type: String, default: "Estudio"},
    cuando: {type: String, default: null},
    dia: {type: Date, default: null}
})

module.exports = mongoose.model('Note', NoteSchema)