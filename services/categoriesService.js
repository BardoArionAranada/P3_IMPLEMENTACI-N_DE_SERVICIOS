// Archivo: services/categoriesService.js
// Descripción:
// Servicio de categorías. Ahora utiliza los datos compartidos desde sharedData.js,
// garantizando sincronización con productos y evitando generar listas independientes.
//
// Entidades manejadas:
//  - id: número identificador
//  - name: nombre de la categoría
//  - description: descripción de la categoría
//  - active: estado (true/false)

const { categories } = require('../sharedData');

class CategoriesService {
  constructor() {
    // Usa el arreglo compartido de categorías
    this.categories = categories;
  }

  // Obtener todas las categorías
  async getAll() {
    return this.categories;
  }

  // Obtener categoría por ID
  async getById(id) {
    return this.categories.find(item => item.id === Number(id));
  }

  // Crear nueva categoría
  async create(data) {
    const newCategory = {
      id: this.categories.length + 1,
      name: data.name || 'Sin nombre',
      description: data.description || 'Sin descripción',
      active: data.active ?? true
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  // Actualizar categoría existente
  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === Number(id));
    if (index === -1) throw new Error('Categoría no encontrada');
    const category = this.categories[index];
    this.categories[index] = { ...category, ...changes };
    return this.categories[index];
  }

  // Eliminar categoría
  async delete(id) {
    const index = this.categories.findIndex(item => item.id === Number(id));
    if (index === -1) return null;
    this.categories.splice(index, 1);
    return { id: Number(id) };
  }
}

module.exports = CategoriesService;
