// Archivo: routes/brands.js
// Descripción:
// Rutas CRUD del recurso "Brands" con documentación Swagger completa y validación de relaciones.
// Actualizado para usar base de datos MongoDB Atlas mediante servicios (brandsService.js y productsService.js)

const express = require('express');
const BrandsService = require('../services/brandsService');
const ProductsService = require('../services/productsService');

const router = express.Router();
const service = new BrandsService();
const productsService = new ProductsService();

// GET → obtener todas las marcas
/**
 * @swagger
 * tags:
 *   - name: Brands
 *     description: Endpoints relacionados con las marcas
 * /brands:
 *  get:
 *    summary: Obtener todas las marcas
 *    tags: [Brands]
 *    responses:
 *     200:
 *      description: Lista de marcas
 */
router.get('/', async (req, res) => {
  try {
    const brands = await service.getAll();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las marcas', error });
  }
});

// GET → obtener marca por ID
/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtener una marca por ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marca encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await service.getById(id);
    if (!brand) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la marca', error });
  }
});

// POST → crear nueva marca
/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Crear una nueva marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newBrand = await service.create(body);
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la marca', error });
  }
});

// PUT → actualizar marca existente
/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Actualizar una marca existente
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca a actualizar
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
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Marca actualizada exitosamente
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updated = await service.update(id, body);
    if (!updated) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la marca', error });
  }
});

// DELETE → eliminar marca (con validación de productos asociados)
/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Eliminar una marca existente
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marca eliminada exitosamente
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validación: no eliminar si hay productos asociados
    const relatedProducts = await productsService.getAll();
    const productsLinked = relatedProducts.filter(p => p.brandId?.toString() === id);

    if (productsLinked.length > 0) {
      return res.status(400).json({
        message: 'No se puede eliminar la marca: existen productos asociados',
        totalRelacionados: productsLinked.length
      });
    }

    const deleted = await service.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }

    res.json({
      message: `Marca eliminada correctamente (ID ${id})`,
      deleted
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la marca', error });
  }
});

module.exports = router;
