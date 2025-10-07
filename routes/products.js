// routes/products.js
// CRUD de productos usando el servicio modular

const express = require('express');
const ProductsService = require('../services/productsService');

const router = express.Router();
const service = new ProductsService();

// GET todos los productos
router.get('/', (req, res) => {
  const products = service.getAll();
  res.json(products);
});

// GET producto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product Not Found' });
  }

  res.json(product);
});

// POST crear nuevo producto
router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);

  res.status(201).json({
    message: 'Product Created',
    data: newProduct,
  });
});

// PUT actualizar producto existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updatedProduct = service.update(id, body);
    res.json({
      message: 'Product Updated',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE eliminar producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedProduct = service.delete(id);

  if (!deletedProduct) {
    return res.status(404).json({ message: 'Product Not Found' });
  }

  res.json({
    message: 'Product Deleted',
    data: deletedProduct,
  });
});

module.exports = router;
