// routes/rutas.js
// Centraliza todos los routers y los monta con su prefijo.

const express = require('express');
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const brandsRouter = require('./brands');
const productsRouter = require('./products');

// Función que recibe la app de Express y monta los routers con sus prefijos.
function routerApi(app) {
  const router = express.Router();
  app.use('/', router);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/brands', brandsRouter);
  router.use('/products', productsRouter);
}

module.exports = routerApi;
