// Middleware centralizado para errores
function errorHandler(err, req, res, next) {
  console.error('[Error Handler]', err);

  const status = err.status || 500;
  const code = err.code || (status === 500 ? 'INTERNAL_ERROR' : 'ERROR');
  const message = err.message || (status === 500 ? 'Error interno del servidor' : 'Error');
  const errors = err.errors || undefined;

  res.status(status).json({
    status,
    code,
    message,
    ...(errors ? { errors } : {})
  });
}

module.exports = errorHandler;
