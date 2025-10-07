// routes/categories.js
// CRUD de categorías usando el servicio modular

const express = require('express');
const CategoriesService = require('../services/categoriesService');

const router = express.Router();
const service = new CategoriesService();

// GET todas las categorías
router.get('/', (req, res) => {
  const categories = service.getAll();
  res.json(categories);
});

// GET categoría por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.getById(id);

  if (!category) {
    return res.status(404).json({ message: 'Category Not Found' });
  }

  res.json(category);
});

// POST crear nueva categoría
router.post('/', (req, res) => {
  const body = req.body;
  const newCategory = service.create(body);

  res.status(201).json({
    message: 'Category Created',
    data: newCategory
  });
});

// PUT actualizar categoría existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updatedCategory = service.update(id, body);
    res.json({
      message: 'Category Updated',
      data: updatedCategory
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE eliminar categoría
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedCategory = service.delete(id);

  if (!deletedCategory) {
    return res.status(404).json({ message: 'Category Not Found' });
  }

  res.json({
    message: 'Category Deleted',
    data: deletedCategory
  });
});

module.exports = router;
