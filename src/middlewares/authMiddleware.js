const jwt = require('jsonwebtoken');

module.exports = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ mensaje: 'Acceso no autorizado' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(decoded.rol)) {
        return res.status(403).json({ mensaje: 'No tienes permisos suficientes' });
      }
      req.usuario = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ mensaje: 'Token invalido o expirado' });
    }
  };
};
