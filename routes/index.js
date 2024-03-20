const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController.js');

const auth = require('../middleware/auth.js')

router.get('/api/v1/estudiantes', auth.authenticate(),estudianteController.getAllEstudiantes);

router.post('/api/v1/estudiantes', estudianteController.createEstudiante);

router.get('/api/v1/estudiantes/notas/id/:id',
estudianteController.getNotaByid);

router.get('/api/v1/estudiantes/notas', estudianteController.getNotasEstudiantes);

router.post('/register', estudianteController.register);

router.post('/login', estudianteController.login);

module.exports = router;