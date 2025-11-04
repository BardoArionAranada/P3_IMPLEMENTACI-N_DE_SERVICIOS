// Archivo: routes/rutas.js
// Descripción: Agrupador central de todas las rutas de la API
// Adaptado para usar las mismas instancias de servicios y evitar duplicados de datos.

const express = require('express');

// Importación de rutas
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const brandsRouter = require('./brands');
const productsRouter = require('./products');

// Agrupador de rutas principales (sin prefijo)
function routerApi(app) {
  const router = express.Router();

  // Prefijo base
  app.use('/', router);

  // Rutas principales
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/brands', brandsRouter);
  router.use('/products', productsRouter);

  // Verificación en consola
  console.log(' Rutas cargadas: /users, /categories, /brands, /products');
}

module.exports = routerApi;
