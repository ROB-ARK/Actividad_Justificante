const Justificante = require('../models/Justificante');
const Usuario = require('../models/Usuario');
const Estado = require('../models/Estado');

exports.crearSolicitud = async (req, res) => {
  try {
    const { fechas_faltas, caso_critico, materias_afectadas, motivo } = req.body;
    const archivoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const nuevo = await Justificante.create({
      id_alumno: req.usuario.id,
      fechas_faltas,
      caso_critico: caso_critico || 'NO',
      materias_afectadas,
      motivo,
      documento_comprobatorio_url: archivoUrl,
      id_estado: 1 // PENDIENTE_TUTOR
    });
    res.status(201).json({ mensaje: 'Solicitud enviada con exito', justificante: nuevo });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la solicitud', error: error.message });
  }
};

exports.obtenerMisJustificantes = async (req, res) => {
  try {
    const lista = await Justificante.findAll({
      where: { id_alumno: req.usuario.id },
      include: [
        { model: Estado },
        { model: Usuario, as: 'Alumno', attributes: ['nombre', 'apellidos', 'matricula', 'grado_grupo', 'nombre_tutor_padre'] }
      ],
      order: [['fecha_solicitud', 'DESC']]
    });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar historial', error: error.message });
  }
};

exports.obtenerPendientesTutor = async (req, res) => {
  try {
    const lista = await Justificante.findAll({
      where: { id_estado: 1 },
      include: [
        { model: Estado },
        { model: Usuario, as: 'Alumno', attributes: ['nombre', 'apellidos', 'matricula', 'grado_grupo'] }
      ]
    });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pendientes', error: error.message });
  }
};

exports.dictamenTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { aprobar, motivo_rechazo } = req.body;
    const just = await Justificante.findByPk(id);
    if (!just) return res.status(404).json({ mensaje: 'Justificante no encontrado' });

    if (aprobar) {
      just.id_estado = 2;
      just.id_tutor_educativo = req.usuario.id;
    } else {
      just.id_estado = 4;
      just.motivo_rechazo = motivo_rechazo || 'Rechazado por el Maestro Tutor';
      just.id_tutor_educativo = req.usuario.id;
    }
    await just.save();
    res.json({ mensaje: 'Dictamen registrado por el Tutor', justificante: just });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al procesar dictamen', error: error.message });
  }
};

exports.obtenerPendientesDireccion = async (req, res) => {
  try {
    const lista = await Justificante.findAll({
      where: { id_estado: 2 },
      include: [
        { model: Estado },
        { model: Usuario, as: 'Alumno', attributes: ['nombre', 'apellidos', 'matricula', 'grado_grupo'] },
        { model: Usuario, as: 'Tutor', attributes: ['nombre', 'apellidos'] }
      ]
    });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar pendientes de Direccion', error: error.message });
  }
};

exports.dictamenDireccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { validar, motivo_rechazo } = req.body;
    const just = await Justificante.findByPk(id);
    if (!just) return res.status(404).json({ mensaje: 'Justificante no encontrado' });

    if (validar) {
      const count = await Justificante.count({ where: { id_estado: 3 } });
      const folioGen = `UTXJ-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
      const vigencia = new Date();
      vigencia.setDate(vigencia.getDate() + 3);
      just.id_estado = 3;
      just.folio = folioGen;
      just.id_director = req.usuario.id;
      just.fecha_validacion = new Date();
      just.vigencia_hasta = vigencia;
    } else {
      just.id_estado = 4;
      just.motivo_rechazo = motivo_rechazo || 'Rechazado por Direccion de Carrera';
      just.id_director = req.usuario.id;
    }
    await just.save();
    res.json({ mensaje: 'Resolucion de Direccion guardada', justificante: just });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al validar justificante', error: error.message });
  }
};
