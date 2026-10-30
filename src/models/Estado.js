const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estado = sequelize.define('Estado', {
  id_estado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'estados' });
module.exports = Estado;
