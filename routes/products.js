// Archivo: routes/products.js
// Descripción:
// Rutas CRUD del recurso "Products" con validaciones de relaciones con Brands y Categories.
// Actualizado para usar servicios con datos compartidos desde sharedData.js.

const express = require('express');
const ProductsService = require('../services/productsService');
const BrandsService = require('../services/brandsService');
const CategoriesService = require('../services/categoriesService');

const router = express.Router();

// Instancias sincronizadas con sharedData.js
const service = new ProductsService();
const brandsService = new BrandsService();
const categoriesService = new CategoriesService();

// GET → obtener todos los productos
/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Endpoints relacionados con los productos
 * /products:
 *  get:
 *    summary: Obtener todos los productos
 *    tags: [Products]
 *    responses:
 *     200:
 *      description: Lista completa de productos
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
 *           price:
 *            type: number
 *           stock:
 *            type: number
 *           image:
 *            type: string
 *           categoryId:
 *            type: number
 *           brandId:
 *            type: number
 *           active:
 *            type: boolean
 */
router.get('/', async (req, res, next) => {
  try {
    const products = await service.getAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET → obtener producto por ID
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.getById(id);
  res.json(product);
});

// POST → crear producto (valida existencia de categoría y marca)
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto validando relaciones
 *     tags: [Products]
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
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: number
 *               brandId:
 *                 type: number
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  const body = req.body;

  // Obtener datos actualizados de categorías y marcas
  const categories = await categoriesService.getAll();
  const brands = await brandsService.getAll();

  // Validar existencia de las relaciones
  const categoryExists = categories.some(c => c.id === Number(body.categoryId));
  const brandExists = brands.some(b => b.id === Number(body.brandId));

  if (!categoryExists) {
    return res.status(400).json({
      message: `No se puede crear el producto: la categoría con ID ${body.categoryId} no existe.`,
    });
  }

  if (!brandExists) {
    return res.status(400).json({
      message: `No se puede crear el producto: la marca con ID ${body.brandId} no existe.`,
    });
  }

  // Crear producto
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'Producto creado exitosamente',
    newProduct,
  });
});

// PUT → actualizar producto existente (valida relaciones)
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto existente validando relaciones
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: number
 *               brandId:
 *                 type: number
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error de validación
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const categories = await categoriesService.getAll();
  const brands = await brandsService.getAll();

  const categoryExists = categories.some(c => c.id === Number(body.categoryId));
  const brandExists = brands.some(b => b.id === Number(body.brandId));

  if (!categoryExists) {
    return res.status(400).json({
      message: `No se puede actualizar el producto: la categoría con ID ${body.categoryId} no existe.`,
    });
  }

  if (!brandExists) {
    return res.status(400).json({
      message: `No se puede actualizar el producto: la marca con ID ${body.brandId} no existe.`,
    });
  }

  const updated = await service.update(id, body);
  res.json({
    message: 'Producto actualizado correctamente',
    updated,
  });
});

// DELETE → eliminar producto
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto existente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await service.delete(id);
  res.json({
    message: `Producto eliminado correctamente (ID ${id})`,
    deleted,
  });
});

module.exports = router;
