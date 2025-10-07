// services/brandsService.js
const { faker } = require('@faker-js/faker');

class BrandsService {
  constructor() {
    // Arreglo de marcas
    this.brands = [];
    this.generate();
  }

  // Generar 100 marcas falsas
  generate() {
    for (let i = 0; i < 100; i++) {
      this.brands.push({
        id: i + 1,
        brandName: faker.company.name(),
        description: faker.company.catchPhrase(),
        active: faker.datatype.boolean()
      });
    }
  }

  // Obtener todas las marcas
  getAll() {
    return this.brands;
  }

  // Obtener marca por ID
  getById(id) {
    return this.brands.find(item => item.id === Number(id));
  }

  // Crear marca nueva
  create(data) {
    const newBrand = {
      id: this.brands.length + 1,
      ...data
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  // Actualizar marca
  update(id, changes) {
    const index = this.brands.findIndex(item => item.id === Number(id));
    if (index === -1) throw new Error('Marca no encontrada');
    const brand = this.brands[index];
    this.brands[index] = { ...brand, ...changes };
    return this.brands[index];
  }

  // Eliminar marca
  delete(id) {
    const index = this.brands.findIndex(item => item.id === Number(id));
    if (index === -1) return null;
    this.brands.splice(index, 1);
    return { id: Number(id) };
  }
}

module.exports = BrandsService;
