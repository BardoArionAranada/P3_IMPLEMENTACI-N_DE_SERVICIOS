// Archivo: index.js
// Descripción:
// Punto de entrada principal de la API. Configura Express, las rutas, la documentación Swagger
// y la conexión con MongoDB Atlas. Mantiene el formato de la práctica P3 – Implementación de Servicios.

// importaciones principales
const express = require('express');
const routerApi = require('./routes/rutas'); // agrupador de rutas
const setupSwagger = require('./swagger'); // documentación Swagger
const { logErrors, errorHandler } = require('./middlewares/errorHandler'); // manejo de errores
const connectDB = require('./db'); // conexión a MongoDB Atlas

// instancia
const app = express();
const port = 3000;

// conexión a MongoDB Atlas
connectDB();

// permite recibir datos en formato JSON
app.use(express.json());

// ruta principal
app.get('/', (req, res) => {
  res.send(`
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>P3 Implementación de Servicios</title>
      </head>
      <body style="background:#121212;color:#00ffcc;text-align:center;font-family:Arial,sans-serif;">
        <h1>API – Users | Categories | Brands | Products</h1>
        <p>Implementación de Servicios con conexión a MongoDB Atlas y documentación Swagger</p>
        <p>Visita la documentación en <a href="/api-docs" style="color:#00ffcc;">/api-docs</a></p>
      </body>
    </html>
  `);
});

// agrupamos todas las rutas (sin prefijo)
routerApi(app);

// documentación Swagger
setupSwagger(app);

// middlewares de error
app.use(logErrors);
app.use(errorHandler);

// servidor
app.listen(port, () => {
  console.log('✅ Conexión inicializada correctamente');
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📘 Documentación Swagger disponible en http://localhost:${port}/api-docs`);
});
