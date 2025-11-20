function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol admin' });
  }

  next();
}

module.exports = requireAdmin;
