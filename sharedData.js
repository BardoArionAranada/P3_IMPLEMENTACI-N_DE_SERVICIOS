// Archivo: sharedData.js
// Descripción:
// Este archivo centraliza los arreglos de datos compartidos de toda la aplicación.
// Se generan una sola vez al iniciar el servidor y se exportan para que
// todos los servicios trabajen sobre las mismas estructuras en memoria.

// Incluye todas las ENTIDADES completas:
//  - Users: id, name, username, email, avatar, password
//  - Categories: id, name, description, active
//  - Brands: id, name, country, description, active
//  - Products: id, name, description, price, stock, image, categoryId, brandId, active

const { faker } = require('@faker-js/faker');

//  Usuarios
const users = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  username: faker.internet.username(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  password: faker.internet.password({ length: 10 })
}));

//  Categorías
const categories = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.commerce.department(),
  description: faker.commerce.productDescription(),
  active: faker.datatype.boolean()
}));

//  Marcas
const brands = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.company.name(),
  country: faker.location.country(),
  description: faker.company.catchPhrase(),
  active: faker.datatype.boolean()
}));

//  Productos
const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price({ min: 50, max: 5000 })),
  stock: faker.number.int({ min: 0, max: 100 }),
  image: faker.image.urlLoremFlickr({ category: 'product' }),
  categoryId: faker.helpers.arrayElement(categories).id,
  brandId: faker.helpers.arrayElement(brands).id,
  active: faker.datatype.boolean()
}));

// Exportar datos compartidos
module.exports = {
  users,
  categories,
  brands,
  products
};
