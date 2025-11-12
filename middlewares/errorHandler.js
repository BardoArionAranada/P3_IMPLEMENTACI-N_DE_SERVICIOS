// Archivo: middlewares/errorHandler.js
// Descripción:
// Middleware centralizado para el manejo de errores en la API.
// Captura, registra y responde a los errores ocurridos en las rutas o servicios.
// Compatible con las operaciones de MongoDB Atlas y Mongoose.

// Middleware para registrar errores en consola
function logErrors(err, req, res, next) {
  console.error('⚠️ Error detectado:', err);
  next(err);
}

// Middleware para manejar errores y devolver respuesta en formato JSON
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: 'Ocurrió un error en el servidor',
    error: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, errorHandler };
