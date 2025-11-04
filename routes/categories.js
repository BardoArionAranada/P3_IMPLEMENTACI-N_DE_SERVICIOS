// Archivo: routes/categories.js
// Descripción:
// Rutas CRUD del recurso "Categories" con documentación Swagger completa y validación de relaciones.
// Actualizado para usar datos compartidos desde sharedData.js y mantener coherencia entre entidades.

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
 *           id:
 *            type: number
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
 *           type: number
 *     responses:
 *       200:
 *         description: Categoría encontrada
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await service.getById(id);
  res.json(category);
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
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
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
 *           type: number
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
  const { id } = req.params;
  const body = req.body;
  const updated = await service.update(id, body);
  res.json(updated);
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
 *           type: number
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Validación: no eliminar si hay productos asociados
  const relatedProducts = (await productsService.getAll()).filter(
    p => p.categoryId === Number(id)
  );

  if (relatedProducts.length > 0) {
    return res.status(400).json({
      message: 'No se puede eliminar la categoría: existen productos asociados',
      totalRelacionados: relatedProducts.length
    });
  }

  const deleted = await service.delete(id);
  res.json({
    message: `Categoría eliminada correctamente (ID ${id})`,
    deleted
  });
});

module.exports = router;
