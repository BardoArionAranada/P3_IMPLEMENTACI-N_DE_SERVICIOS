// Archivo: routes/brands.js
// Descripción:
// Rutas CRUD del recurso "Brands" con documentación Swagger completa y validación de relaciones.
// Actualizado para usar datos compartidos desde sharedData.js a través de los servicios.

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
  const brands = await service.getAll();
  res.json(brands);
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
 *           type: number
 *     responses:
 *       200:
 *         description: Marca encontrada
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const brand = await service.getById(id);
  res.json(brand);
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
  const body = req.body;
  const newBrand = await service.create(body);
  res.status(201).json(newBrand);
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
  const { id } = req.params;
  const body = req.body;
  const updated = await service.update(id, body);
  res.json(updated);
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
 *           type: number
 *     responses:
 *       200:
 *         description: Marca eliminada exitosamente
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Validación: no eliminar si hay productos asociados
  const relatedProducts = (await productsService.getAll()).filter(
    p => p.brandId === Number(id)
  );

  if (relatedProducts.length > 0) {
    return res.status(400).json({
      message: 'No se puede eliminar la marca: existen productos asociados',
      totalRelacionados: relatedProducts.length
    });
  }

  const deleted = await service.delete(id);
  res.json({
    message: `Marca eliminada correctamente (ID ${id})`,
    deleted
  });
});

module.exports = router;
