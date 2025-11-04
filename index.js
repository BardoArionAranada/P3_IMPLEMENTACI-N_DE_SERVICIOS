// importaciones principales
const express = require('express');
const routerApi = require('./routes/rutas'); // agrupador de rutas
const setupSwagger = require('./swagger'); // documentación Swagger
const { logErrors, errorHandler } = require('./middlewares/errorHandler'); // manejo de errores

// instancia
const app = express();
const port = 3000;

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
        <p>Práctica 3: Implementación de Servicios con Swagger</p>
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
  console.log(` Servidor corriendo en http://localhost:${port}`);
  console.log(` Documentación Swagger en http://localhost:${port}/api-docs`);
});
