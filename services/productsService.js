// services/productsService.js
const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    // Arreglo en memoria
    this.products = [];
    this.generate(); // Crear datos iniciales
  }

  // Generar 100 productos falsos
  generate() {
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: i + 1,
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.number.int({ min: 0, max: 100 }),
        image: faker.image.url(),
        categoryId: faker.number.int({ min: 1, max: 6 }),
        brandId: faker.number.int({ min: 1, max: 100 })
      });
    }
  }

  // Obtener todos los productos
  getAll() {
    return this.products;
  }

  // Obtener producto por ID
  getById(id) {
    return this.products.find(item => item.id === Number(id));
  }

  // Crear nuevo producto
  create(data) {
    const newProduct = {
      id: this.products.length + 1,
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // Actualizar producto existente
  update(id, changes) {
    const index = this.products.findIndex(item => item.id === Number(id));
    if (index === -1) throw new Error('Producto no encontrado');
    const product = this.products[index];
    this.products[index] = { ...product, ...changes };
    return this.products[index];
  }

  // Eliminar producto
  delete(id) {
    const index = this.products.findIndex(item => item.id === Number(id));
    if (index === -1) return null;
    this.products.splice(index, 1);
    return { id: Number(id) };
  }
}

module.exports = ProductsService;
