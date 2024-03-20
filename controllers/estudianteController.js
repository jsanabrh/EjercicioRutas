const Estudiante = require ('../models/estudianteModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Passport } = require('passport');
const jwt_secret = 'mysecrettoken'

const estudianteController = {
    getAllEstudiantes: async(req,res) => {
        try {
            const estudiante = await Estudiante.find();
            res.json(estudiante);
        } catch (error) {
            console.error('Error al obtener los registros: ', error);
            res.status(500).json({messge:'Internal Server Error'});
        }
    },
    createEstudiante: async(req,res) => {
        const estudianteData = req.body;
        try {
            const newEstudiante = new Estudiante(estudianteData);
            const savedEstudiante = await newEstudiante.save()
            res.status(201).json(savedEstudiante);
        } catch (error) {
            console.error('Error al crear el estudiante:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getNotaByid: async(req,res) => {
        const id = req.params.id;
        try {
            const estudianteId = await Estudiante.findById(id);
            res.json(estudianteId);
        } catch (error) {
            console.error('Error al buscar al estudiante: ', id, error);
            res.status(500).json({message: 'Internal Server Error'})
        }
    },
    getNotasEstudiantes: async(req,res) => {
        const nota = req.params;
        try {
            const estudiante = await Estudiante.find({}, {nota:1,_id: 0});
            res.json(estudiante);
        } catch (error) {
            console.error('Error al buscar las notas: ', nota, error);
            res.status(500).json({message: 'Internal Server Error'})
        }
    },
    register: async(req,res)=>{
        try {
            const estudiante = await Estudiante.find;
            const {nombre, materia, nota} = req.body;

            const estudianteData = {
                userId:estudiante.length+1,
                nombre:nombre,
                materia:materia,
                nota: await bcrypt.hash(nota,10)
            }

            const newEstudiante = new Estudiante(estudianteData);
            const savedEstudiante = await newEstudiante.save();
            res.status(201).json(savedEstudiante);
        } catch (error) {
            console.error('Error al registrar el estudiante: ',error);
            res.status(500).json({message: 'Internal Server Error'})
        }
    },
    login: async(req,res)=>{
        try {
            const {nombre,nota} = req.body;
            const estudiante = await Estudiante.find({nombre:nombre});
            if(!estudiante){
                return res.status(400).json({message:"Nombre o contraseña invalidos..."})
            }

            const isPassWordValid = await bcrypt.compare(nota,estudiante[0].nota);
            const token = jwt.sign({userId: estudiante.id},jwt_secret,{expiresIn:"1h"});

            res.json({message:'Has ingresado correctamente', token})

        } catch (error) {
            console.error('Error al iniciar sesion ',error);
            res.status(500).json({message: 'Internal Server Error'})
        }
    } 
}

module.exports = estudianteController;