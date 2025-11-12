// Archivo: routes/categories.js
// Descripción:
// Rutas CRUD del recurso "Categories" con documentación Swagger completa y validación de relaciones.
// Actualizado para usar base de datos MongoDB Atlas mediante los servicios (categoriesService.js y productsService.js)

const express = require('express');
const CategoriesService = require('../services/categoriesService');
const ProductsService = require('../services/productsService');

const router = express.Router();
const service = new CategoriesService();
const productsService = new ProductsService();

// GET → obtener todas las categorías
/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Endpoints relacionados con las categorías
 * /categories:
 *  get:
 *    summary: Obtener todas las categorías
 *    tags: [Categories]
 *    responses:
 *     200:
 *      description: Lista de categorías
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           _id:
 *            type: string
 *           name:
 *            type: string
 *           description:
 *            type: string
 *           active:
 *            type: boolean
 */
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.getAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// GET → obtener categoría por ID
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await service.getById(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoría', error });
  }
});

// POST → crear nueva categoría
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoría', error });
  }
});

// PUT → actualizar categoría existente
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualizar una categoría existente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updated = await service.update(id, body);
    if (!updated) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la categoría', error });
  }
});

// DELETE → eliminar categoría (con validación de productos asociados)
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría existente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validación: no eliminar si hay productos asociados
    const relatedProducts = await productsService.getAll();
    const productsLinked = relatedProducts.filter(p => p.categoryId?.toString() === id);

    if (productsLinked.length > 0) {
      return res.status(400).json({
        message: 'No se puede eliminar la categoría: existen productos asociados',
        totalRelacionados: productsLinked.length
      });
    }

    const deleted = await service.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json({
      message: `Categoría eliminada correctamente (ID ${id})`,
      deleted
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error });
  }
});

module.exports = router;
