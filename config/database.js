const mongoose = require('mongoose');
let Estudiante;

const connectDatabase = async() => {
    try {
        if(!Estudiante){
            Estudiante = mongoose.model('estudiante', require("../models/estudianteModel").schema)
        }
        
        await mongoose.connect('mongodb+srv://juanhoyos0422:juan123456789@taller.s5myemn.mongodb.net/')
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err))

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDatabase;