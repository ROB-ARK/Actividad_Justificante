const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.registro = async (req, res) => {
  try {
    const { matricula, nombre, apellidos, email, password, id_rol, id_carrera, grado_grupo, nombre_tutor_padre } = req.body;
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ mensaje: 'El correo ya esta registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({
      matricula, nombre, apellidos, email,
      password: hashedPassword,
      id_rol: parseInt(id_rol), id_carrera: id_carrera || 1,
      grado_grupo, nombre_tutor_padre
    });
    res.status(201).json({ mensaje: 'Usuario registrado correctamente', id_usuario: nuevoUsuario.id_usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) return res.status(401).json({ mensaje: 'Contrasena incorrecta' });

    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.id_rol, nombre: `${usuario.nombre} ${usuario.apellidos}` },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token, id_rol: usuario.id_rol, nombre: `${usuario.nombre} ${usuario.apellidos}` });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesion', error: error.message });
  }
};
