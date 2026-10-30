const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = sequelize.define('Usuario', {
  id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  matricula: { type: DataTypes.STRING, unique: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellidos: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  id_rol: { type: DataTypes.INTEGER, allowNull: false },
  id_carrera: { type: DataTypes.INTEGER },
  grado_grupo: { type: DataTypes.STRING },
  nombre_tutor_padre: { type: DataTypes.STRING }
}, { tableName: 'usuarios' });
module.exports = Usuario;
