// Archivo: services/productsService.js
// Descripción:
// Servicio de productos. Actualizado para usar base de datos MongoDB Atlas mediante el modelo Product.
// Garantiza la sincronización con categorías y marcas almacenadas en la base de datos.
//
// Entidades manejadas:
//  - _id: identificador único (Number)
//  - name: nombre del producto
//  - description: descripción detallada
//  - price: precio numérico
//  - stock: unidades disponibles
//  - image: URL de imagen
//  - categoryId: relación con categoría (Number)
//  - brandId: relación con marca (Number)
//  - active: estado lógico

const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');

class ProductsService {
  constructor() {
    // Conexión a la colección de productos gestionada desde MongoDB Atlas
  }

  // Obtener todos los productos
  async getAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error(' Error al obtener productos:', error);
      throw new Error('Error al obtener los productos: ' + error.message);
    }
  }

  // Obtener producto por ID
  async getById(id) {
    try {
      const product = await Product.findOne({ _id: Number(id) });
      if (!product) return null;
      return product;
    } catch (error) {
      console.error(' Error al buscar producto:', error);
      throw new Error('Error al buscar el producto: ' + error.message);
    }
  }

  // Crear nuevo producto (valida categoría y marca)
  async create(data) {
    try {
      // Validar existencia de categoría y marca
      const categoryExists = await Category.findOne({ _id: Number(data.categoryId) });
      const brandExists = await Brand.findOne({ _id: Number(data.brandId) });

      if (!categoryExists) {
        throw new Error(`La categoría con ID ${data.categoryId} no existe.`);
      }
      if (!brandExists) {
        throw new Error(`La marca con ID ${data.brandId} no existe.`);
      }

      // Crear producto
      const newProduct = new Product({
        _id: Number(data._id),
        name: data.name || 'Sin nombre',
        description: data.description || 'Sin descripción',
        price: parseFloat(data.price) || 0,
        stock: data.stock ?? 0,
        image: data.image || 'https://placehold.co/400x300?text=Producto',
        categoryId: Number(data.categoryId),
        brandId: Number(data.brandId),
        active: data.active ?? true
      });

      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      console.error(' Error al crear el producto:', error);
      throw new Error('Error al crear el producto: ' + error.message);
    }
  }

  // Actualizar producto existente (validación flexible)
  async update(id, changes) {
    try {
      // Si se envían categoryId o brandId, validar que existan
      if (changes.categoryId) {
        const categoryExists = await Category.findOne({ _id: Number(changes.categoryId) });
        if (!categoryExists) {
          throw new Error(`La categoría con ID ${changes.categoryId} no existe.`);
        }
      }

      if (changes.brandId) {
        const brandExists = await Brand.findOne({ _id: Number(changes.brandId) });
        if (!brandExists) {
          throw new Error(`La marca con ID ${changes.brandId} no existe.`);
        }
      }

      // Actualización del producto
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: Number(id) },
        { $set: changes },
        { new: true }
      );

      if (!updatedProduct) throw new Error(`No se encontró el producto con ID ${id}`);
      return updatedProduct;
    } catch (error) {
      console.error(' Error al actualizar producto:', error);
      throw new Error('Error al actualizar el producto: ' + error.message);
    }
  }

  // Eliminar producto
  async delete(id) {
    try {
      const deletedProduct = await Product.findOneAndDelete({ _id: Number(id) });
      if (!deletedProduct) throw new Error(`No se encontró el producto con ID ${id}`);
      return deletedProduct;
    } catch (error) {
      console.error(' Error al eliminar producto:', error);
      throw new Error('Error al eliminar el producto: ' + error.message);
    }
  }
}

module.exports = ProductsService;
