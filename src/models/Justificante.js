const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Estado = require('./Estado');

const Justificante = sequelize.define('Justificante', {
  id_justificante: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  folio: { type: DataTypes.STRING, unique: true },
  id_alumno: { type: DataTypes.INTEGER, allowNull: false },
  fechas_faltas: { type: DataTypes.STRING, allowNull: false },
  caso_critico: { type: DataTypes.ENUM('SI', 'NO'), defaultValue: 'NO' },
  materias_afectadas: { type: DataTypes.TEXT, allowNull: false },
  motivo: { type: DataTypes.TEXT, allowNull: false },
  documento_comprobatorio_url: { type: DataTypes.STRING },
  id_tutor_educativo: { type: DataTypes.INTEGER },
  id_director: { type: DataTypes.INTEGER },
  id_estado: { type: DataTypes.INTEGER, defaultValue: 1 },
  motivo_rechazo: { type: DataTypes.TEXT },
  fecha_solicitud: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  fecha_validacion: { type: DataTypes.DATE },
  vigencia_hasta: { type: DataTypes.DATEONLY }
}, { tableName: 'justificantes' });

Justificante.belongsTo(Usuario, { as: 'Alumno', foreignKey: 'id_alumno' });
Justificante.belongsTo(Usuario, { as: 'Tutor', foreignKey: 'id_tutor_educativo' });
Justificante.belongsTo(Usuario, { as: 'Director', foreignKey: 'id_director' });
Justificante.belongsTo(Estado, { foreignKey: 'id_estado' });

module.exports = Justificante;
