const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const justificanteRoutes = require('./routes/justificanteRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/auth', authRoutes);
app.use('/api/justificantes', justificanteRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Conexion exitosa a MySQL (db_utxj_justificantes)');
  app.listen(PORT, () => {
    console.log(`Servidor UTXJ corriendo en: http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error de conexion con MySQL:', err);
});
