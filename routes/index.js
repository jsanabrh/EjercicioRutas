const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController.js');

router.get('/api/v1/estudiantes', estudianteController.getAllEstudiantes);

router.post('/api/v1/estudiantes', estudianteController.createEstudiante);

router.get('/api/v1/estudiantes/notas/id/:id',
estudianteController.getNotaByid);

router.get('/api/v1/estudiantes/notas', estudianteController.getNotasEstudiantes);

module.exports = router;