// routes/users.js
// CRUD de usuarios usando el servicio modular

const express = require('express');
const UsersService = require('../services/usersService');

const router = express.Router();
const service = new UsersService();

// GET todos los usuarios
router.get('/', (req, res) => {
  const users = service.getAll();
  res.json(users);
});

// GET usuario por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User Not Found' });
  }

  res.json(user);
});

// POST crear nuevo usuario
router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);

  res.status(201).json({
    message: 'User Created',
    data: newUser
  });
});

// PUT actualizar usuario existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updatedUser = service.update(id, body);
    res.json({
      message: 'User Updated',
      data: updatedUser
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE eliminar usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedUser = service.delete(id);

  if (!deletedUser) {
    return res.status(404).json({ message: 'User Not Found' });
  }

  res.json({
    message: 'User Deleted',
    data: deletedUser
  });
});

module.exports = router;
