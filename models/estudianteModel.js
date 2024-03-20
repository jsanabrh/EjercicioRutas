const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    userId: Number,
    nombre: String,
    materia: String,
    nota: String
});

const estudiante = mongoose.model('estudiante', estudianteSchema);

module.exports = estudiante;