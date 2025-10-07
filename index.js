// index.js
// Punto de entrada del servidor Express.

const express = require('express');
const routerApi = require('./routes/rutas'); // Importo el agrupador de rutas

const app = express();
const port = 3000;

// Middleware para leer JSON en POST/PUT
app.use(express.json());

// Ruta raíz con mensaje HTML 
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>P2 CRUD — Node + Express + Faker</title>
      <style>
        body { background-color: #121212; color: #f5f5f5; font-family: Arial, sans-serif; text-align: center; }
        h1 { color: #00ffcc; margin-top: 20vh; }
      </style>
    </head>
    <body>
      <h1>P2: Endpoints CRUD</h1>
      <p>Users | Categories | Brands | Products</p>
    </body>
    </html>
  `);
});

// Montaje de todos los routers
routerApi(app);

// Arranque del servidor
app.listen(port, () => {
  console.log(`Server corriendo en http://localhost:${port}`);
});
