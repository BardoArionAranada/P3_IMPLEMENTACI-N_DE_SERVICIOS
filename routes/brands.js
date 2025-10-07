// routes/brands.js
// CRUD de marcas usando el servicio modular

const express = require('express');
const BrandsService = require('../services/brandsService');

const router = express.Router();
const service = new BrandsService();

// GET todas las marcas
router.get('/', (req, res) => {
  const brands = service.getAll();
  res.json(brands);
});

// GET marca por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const brand = service.getById(id);

  if (!brand) {
    return res.status(404).json({ message: 'Brand Not Found' });
  }

  res.json(brand);
});

// POST crear nueva marca
router.post('/', (req, res) => {
  const body = req.body;
  const newBrand = service.create(body);

  res.status(201).json({
    message: 'Brand Created',
    data: newBrand
  });
});

// PUT actualizar marca existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updatedBrand = service.update(id, body);
    res.json({
      message: 'Brand Updated',
      data: updatedBrand
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE eliminar marca
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedBrand = service.delete(id);

  if (!deletedBrand) {
    return res.status(404).json({ message: 'Brand Not Found' });
  }

  res.json({
    message: 'Brand Deleted',
    data: deletedBrand
  });
});

module.exports = router;
