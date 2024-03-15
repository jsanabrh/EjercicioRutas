const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    nombre: String,
    materia: String,
    nota: Number
});

const estudiante = mongoose.model('estudiante', estudianteSchema);

module.exports = estudiante;