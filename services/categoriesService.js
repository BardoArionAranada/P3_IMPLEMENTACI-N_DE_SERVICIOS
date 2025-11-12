// Archivo: services/categoriesService.js
// Descripción:
// Servicio de categorías. Actualizado para usar base de datos MongoDB Atlas mediante el modelo Category.
// Las operaciones CRUD se realizan directamente en la colección "categories" con IDs numéricos.
//
// Entidades manejadas:
//  - _id: identificador único (Number)
//  - name: nombre de la categoría
//  - description: descripción de la categoría
//  - active: estado (true/false)

const Category = require('../models/Category');

class CategoriesService {
  constructor() {
    // Conexión a la colección "categories" gestionada desde MongoDB Atlas
  }

  // Obtener todas las categorías
  async getAll() {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      throw new Error('Error al obtener las categorías: ' + error.message);
    }
  }

  // Obtener categoría por ID
  async getById(id) {
    try {
      const category = await Category.findOne({ _id: Number(id) });
      if (!category) throw new Error(`No se encontró la categoría con ID ${id}`);
      return category;
    } catch (error) {
      throw new Error('Error al buscar la categoría: ' + error.message);
    }
  }

  // Crear nueva categoría
  async create(data) {
    try {
      const newCategory = new Category({
        _id: Number(data._id),
        name: data.name || 'Sin nombre',
        description: data.description || 'Sin descripción',
        active: data.active ?? true
      });
      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      console.error('❌ Error al crear la categoría:', error.message);
      throw new Error('Error al crear la categoría: ' + error.message);
    }
  }

  // Actualizar categoría existente
  async update(id, changes) {
    try {
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: Number(id) },
        { $set: changes },
        { new: true }
      );
      if (!updatedCategory) throw new Error(`No se encontró la categoría con ID ${id}`);
      return updatedCategory;
    } catch (error) {
      throw new Error('Error al actualizar la categoría: ' + error.message);
    }
  }

  // Eliminar categoría
  async delete(id) {
    try {
      const deletedCategory = await Category.findOneAndDelete({ _id: Number(id) });
      if (!deletedCategory) throw new Error(`No se encontró la categoría con ID ${id}`);
      return deletedCategory;
    } catch (error) {
      throw new Error('Error al eliminar la categoría: ' + error.message);
    }
  }
}

module.exports = CategoriesService;
