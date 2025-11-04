// middleware para registrar errores
function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

// middleware para manejar errores y devolver respuesta en formato JSON
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, errorHandler };
