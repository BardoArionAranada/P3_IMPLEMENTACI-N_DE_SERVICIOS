// Archivo: routes/products.js
// Descripción:
// Rutas CRUD del recurso "Products" con validaciones condicionales de relaciones con Brands y Categories.
// Actualizado para usar base de datos MongoDB Atlas mediante los servicios (productsService.js, brandsService.js y categoriesService.js)

const express = require('express');
const ProductsService = require('../services/productsService');
const BrandsService = require('../services/brandsService');
const CategoriesService = require('../services/categoriesService');

const router = express.Router();

// Instancias conectadas a los modelos MongoDB
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
 *           _id:
 *            type: string
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
 *            type: string
 *           brandId:
 *            type: string
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
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
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
 *                 type: string
 *               brandId:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body;

    // Verificar existencia de categoría y marca
    const category = await categoriesService.getById(body.categoryId);
    const brand = await brandsService.getById(body.brandId);

    if (!category) {
      return res.status(400).json({
        message: `No se puede crear el producto: la categoría con ID ${body.categoryId} no existe.`,
      });
    }

    if (!brand) {
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
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
});

// PUT → actualizar producto existente (validaciones condicionales)
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
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               brandId:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error de validación
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Verificar si el producto existe
    const existing = await service.getById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Validar relaciones solo si se envían
    if (body.categoryId) {
      const category = await categoriesService.getById(body.categoryId);
      if (!category) {
        return res.status(400).json({
          message: `No se puede actualizar el producto: la categoría con ID ${body.categoryId} no existe.`,
        });
      }
    }

    if (body.brandId) {
      const brand = await brandsService.getById(body.brandId);
      if (!brand) {
        return res.status(400).json({
          message: `No se puede actualizar el producto: la marca con ID ${body.brandId} no existe.`,
        });
      }
    }

    // Actualizar producto
    const updated = await service.update(id, body);
    res.json({
      message: 'Producto actualizado exitosamente',
      updated,
    });
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
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
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({
      message: `Producto eliminado correctamente (ID ${id})`,
      deleted,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
});

module.exports = router;
