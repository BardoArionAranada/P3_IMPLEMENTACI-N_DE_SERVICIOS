// services/usersService.js
const { faker } = require('@faker-js/faker');

class UsersService {
  constructor() {
    // Datos en memoria
    this.users = [];
    this.generate();
  }

  // Generar 100 usuarios falsos
  generate() {
    for (let i = 0; i < 100; i++) {
      this.users.push({
        id: i + 1,
        name: faker.person.fullName(),// nombre completo
        username: faker.internet.username().toLowerCase(), // nombre de usuario en minúsculas
        email: faker.internet.email().toLowerCase(), // correo electrónico en minúsculas
        avatar: faker.image.avatar(), // URL de avatar
        password: faker.internet.password({ length: 10 })
      });
    }
  }

  // Obtener todos los usuarios
  getAll() {
    return this.users;
  }

  // Obtener usuario por ID
  getById(id) {
    return this.users.find(item => item.id === Number(id));
  }

  // Crear usuario nuevo
  create(data) {
    const newUser = {
      id: this.users.length + 1,// nuevo ID secuencial
      ...data // spread operator para copiar las propiedades de data
    };
    this.users.push(newUser);
    return newUser;
  }

  // Actualizar usuario
  update(id, changes) {
    const index = this.users.findIndex(item => item.id === Number(id));
    if (index === -1) throw new Error('Usuario no encontrado');
    const user = this.users[index];
    this.users[index] = { ...user, ...changes };//merge es {...user, ...changes y sirve para actualizar solo las propiedades que vienen en changes}
  }

  // Eliminar usuario
  delete(id) {
    const index = this.users.findIndex(item => item.id === Number(id));
    if (index === -1) return null;
    this.users.splice(index, 1);
    return { id: Number(id) };
  }
}

module.exports = UsersService;
