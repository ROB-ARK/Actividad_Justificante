const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Carrera = sequelize.define('Carrera', {
  id_carrera: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  siglas: { type: DataTypes.STRING, allowNull: false },
  director_nombre: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'carreras' });
module.exports = Carrera;
