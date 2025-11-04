// Archivo: services/usersService.js
// Descripción:
// Servicio de usuarios. Ahora usa los datos compartidos desde sharedData.js,
// evitando duplicación y manteniendo sincronía con el resto de los módulos.

// Entidades manejadas:
//  - id: identificador único del usuario
//  - name: nombre completo
//  - username: nombre de usuario
//  - email: correo electrónico
//  - avatar: imagen del usuario
//  - password: contraseña (simulada con Faker)

const { users } = require('../sharedData');

class UsersService {
  constructor() {
    // Usa el arreglo compartido de usuarios (ya generado en sharedData.js)
    this.users = users;
  }

  // Obtener todos los usuarios
  async getAll() {
    return this.users;
  }

  // Obtener usuario por ID
  async getById(id) {
    return this.users.find(item => item.id === Number(id));
  }

  // Crear nuevo usuario
  async create(data) {
    const newUser = {
      id: this.users.length + 1,
      name: data.name || 'Sin nombre',
      username: data.username || data.name?.toLowerCase().replace(/\s+/g, '') || 'user',
      email: data.email || `${data.name?.toLowerCase().replace(/\s+/g, '')}@example.com`,
      avatar: data.avatar || 'https://placehold.co/200x200?text=Avatar',
      password: data.password || '123456'
    };
    this.users.push(newUser);
    return newUser;
  }

  // Actualizar usuario existente
  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === Number(id));
    if (index === -1) throw new Error('Usuario no encontrado');
    const user = this.users[index];
    this.users[index] = { ...user, ...changes };
    return this.users[index];
  }

  // Eliminar usuario
  async delete(id) {
    const index = this.users.findIndex(item => item.id === Number(id));
    if (index === -1) return null;
    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return { message: `Usuario con ID ${deletedUser.id} eliminado correctamente` };
  }
}

module.exports = UsersService;
