// Archivo: routes/users.js
// Descripción:
// Rutas CRUD del recurso "Users" con documentación Swagger completa.
// Utiliza datos compartidos desde sharedData.js para mantener coherencia global.

const express = require('express');
const UsersService = require('../services/usersService');
const router = express.Router();
const service = new UsersService();

// GET → obtener todos los usuarios
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints relacionados con los usuarios
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista completa de usuarios
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await service.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET → obtener usuario por ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.getById(parseInt(id));
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST → crear nuevo usuario
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      newUser
    });
  } catch (error) {
    next(error);
  }
});

// PUT → actualizar usuario existente
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await service.update(parseInt(id), body);
    res.json({
      message: 'Usuario actualizado correctamente',
      updatedUser
    });
  } catch (error) {
    next(error);
  }
});

// DELETE → eliminar usuario
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await service.delete(parseInt(id));
    res.json({
      message: 'Usuario eliminado correctamente',
      deletedUser
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
