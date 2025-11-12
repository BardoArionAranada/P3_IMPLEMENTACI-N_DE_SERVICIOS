// Archivo: services/brandsService.js
// Descripción:
// Servicio de marcas. Actualizado para usar base de datos MongoDB Atlas mediante el modelo Brand.
// Las operaciones CRUD se realizan directamente en la colección "brands" con IDs numéricos.
//
// Entidades manejadas:
//  - _id: identificador único (Number)
//  - name: nombre de la marca
//  - country: país de origen
//  - description: descripción de la marca
//  - active: estado lógico (true/false)

const Brand = require('../models/Brand');

class BrandsService {
  constructor() {
    // Conexión a la colección "brands" gestionada desde MongoDB Atlas
  }

  // Obtener todas las marcas
  async getAll() {
    try {
      const brands = await Brand.find();
      return brands;
    } catch (error) {
      throw new Error('Error al obtener las marcas: ' + error.message);
    }
  }

  // Obtener marca por ID
  async getById(id) {
    try {
      const brand = await Brand.findOne({ _id: Number(id) });
      if (!brand) throw new Error(`No se encontró la marca con ID ${id}`);
      return brand;
    } catch (error) {
      throw new Error('Error al buscar la marca: ' + error.message);
    }
  }

  // Crear nueva marca
  async create(data) {
    try {
      const newBrand = new Brand({
        _id: Number(data._id),
        name: data.name || 'Sin nombre',
        country: data.country || 'Desconocido',
        description: data.description || 'Sin descripción',
        active: data.active ?? true
      });
      const savedBrand = await newBrand.save();
      return savedBrand;
    } catch (error) {
      console.error('❌ Error al crear la marca:', error.message);
      throw new Error('Error al crear la marca: ' + error.message);
    }
  }

  // Actualizar marca existente
  async update(id, changes) {
    try {
      const updatedBrand = await Brand.findOneAndUpdate(
        { _id: Number(id) },
        { $set: changes },
        { new: true }
      );
      if (!updatedBrand) throw new Error(`No se encontró la marca con ID ${id}`);
      return updatedBrand;
    } catch (error) {
      throw new Error('Error al actualizar la marca: ' + error.message);
    }
  }

  // Eliminar marca
  async delete(id) {
    try {
      const deletedBrand = await Brand.findOneAndDelete({ _id: Number(id) });
      if (!deletedBrand) throw new Error(`No se encontró la marca con ID ${id}`);
      return deletedBrand;
    } catch (error) {
      throw new Error('Error al eliminar la marca: ' + error.message);
    }
  }
}

module.exports = BrandsService;
