// Middleware para verificar roles de usuario
function RequireAuthRole(role) {
  return (req, res, next) => {
    const headerRole = req.headers['AuthRole'] || req.headers['X-Auth-Role'];
    const currentRole = (req.user && req.user.role) || headerRole || 'user';

    if (currentRole !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }

    next();
  };
}

// Middleware para vistas según rol de admin
function AdminRoleView(articles) {
  return async (req, res, next) => {
    try {
      const headerRole = req.headers['AuthRole'] || req.headers['X-Auth-Role'];
      const currentRole = (req.user && req.user.role) || headerRole || 'user';

      // Si es admin, mostrar todos los artículos
      if (currentRole === 'admin') {
        req.articles = articles;
      } else {
        // Si es usuario normal, filtrar solo artículos públicos
        req.articles = articles.filter(article => !article.isPrivate);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  RequireAuthRole,
  AdminRoleView,
};
