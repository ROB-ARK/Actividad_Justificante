const express = require('express');
const router = express.Router();
const justificanteController = require('../controllers/justificanteController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/solicitar', authMiddleware([1]), uploadMiddleware.single('evidencia'), justificanteController.crearSolicitud);
router.get('/mis-justificantes', authMiddleware([1]), justificanteController.obtenerMisJustificantes);

router.get('/tutor/pendientes', authMiddleware([2]), justificanteController.obtenerPendientesTutor);
router.put('/tutor/dictamen/:id', authMiddleware([2]), justificanteController.dictamenTutor);

router.get('/direccion/pendientes', authMiddleware([3]), justificanteController.obtenerPendientesDireccion);
router.put('/direccion/dictamen/:id', authMiddleware([3]), justificanteController.dictamenDireccion);

module.exports = router;
