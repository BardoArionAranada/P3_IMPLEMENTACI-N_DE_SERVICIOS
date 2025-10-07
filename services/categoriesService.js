// services/categoriesService.js
const { faker } = require('@faker-js/faker');

class CategoriesService {
  constructor() {
    // Arreglo de categorías
    this.categories = [];
    this.generate();
  }

  // Generar categorías de ejemplo
  generate() {
    for (let i = 0; i < 6; i++) {
      this.categories.push({
        id: i + 1,
        categoryName: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        active: faker.datatype.boolean()
      });
    }
  }

  // Obtener todas las categorías
  getAll() {
    return this.categories;
  }

  // Obtener categoría por ID
  getById(id) {
    return this.categories.find(item => item.id === Number(id));
  }

  // Crear categoría nueva
  create(data) {
    const newCategory = {
      id: this.categories.length + 1,
      ...data
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  // Actualizar categoría
  update(id, changes) {
    const index = this.categories.findIndex(item => item.id === Number(id));
    if (index === -1) throw new Error('Categoría no encontrada');
    const category = this.categories[index];
    this.categories[index] = { ...category, ...changes };
    return this.categories[index];
  }

  // Eliminar categoría
  delete(id) {
    const index = this.categories.findIndex(item => item.id === Number(id));
    if (index === -1) return null;
    this.categories.splice(index, 1);
    return { id: Number(id) };
  }
}

module.exports = CategoriesService;
