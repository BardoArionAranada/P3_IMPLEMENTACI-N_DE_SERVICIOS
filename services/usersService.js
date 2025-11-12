// Archivo: services/usersService.js
// Descripción:
// Servicio de usuarios. Actualizado para usar base de datos MongoDB Atlas mediante el modelo User.
// Las operaciones CRUD se realizan directamente sobre la colección "users" con IDs numéricos.
//
// Entidades manejadas:
//  - _id: identificador único del usuario (Number)
//  - name: nombre completo
//  - username: nombre de usuario
//  - email: correo electrónico
//  - avatar: imagen del usuario
//  - password: contraseña (texto plano simulado)

const User = require('../models/User');

class UsersService {
  constructor() {
    // Conexión gestionada desde db.js (MongoDB Atlas)
  }

  // Obtener todos los usuarios
  async getAll() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error('Error al obtener los usuarios: ' + error.message);
    }
  }

  // Obtener usuario por ID
  async getById(id) {
    try {
      const user = await User.findOne({ _id: Number(id) });
      if (!user) throw new Error(`No se encontró el usuario con ID ${id}`);
      return user;
    } catch (error) {
      throw new Error('Error al buscar el usuario: ' + error.message);
    }
  }

  // Crear nuevo usuario
  async create(data) {
    try {
      const newUser = new User({
        _id: Number(data._id),
        name: data.name || 'Sin nombre',
        username: data.username || data.name?.toLowerCase().replace(/\s+/g, '') || 'user',
        email: data.email || `${data.name?.toLowerCase().replace(/\s+/g, '')}@example.com`,
        avatar: data.avatar || 'https://placehold.co/200x200?text=Avatar',
        password: data.password || '123456'
      });

      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.error('❌ Error al crear el usuario:', error.message);
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  }

  // Actualizar usuario existente
  async update(id, changes) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: Number(id) },
        { $set: changes },
        { new: true }
      );
      if (!updatedUser) throw new Error(`No se encontró el usuario con ID ${id}`);
      return updatedUser;
    } catch (error) {
      throw new Error('Error al actualizar el usuario: ' + error.message);
    }
  }

  // Eliminar usuario
  async delete(id) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: Number(id) });
      if (!deletedUser) throw new Error(`No se encontró el usuario con ID ${id}`);
      return { message: `Usuario con ID ${id} eliminado correctamente` };
    } catch (error) {
      throw new Error('Error al eliminar el usuario: ' + error.message);
    }
  }
}

module.exports = UsersService;
