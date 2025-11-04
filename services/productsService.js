// Archivo: services/productsService.js
// Descripción:
// Servicio de productos. Ahora usa los datos compartidos desde sharedData.js,
// garantizando sincronización con categorías y marcas.
// Evita la generación independiente con Faker y mantiene coherencia entre entidades.

// Entidades manejadas:
//  - id: identificador numérico
//  - name: nombre del producto
//  - description: descripción detallada
//  - price: precio numérico
//  - stock: unidades disponibles
//  - image: URL de imagen
//  - categoryId: relación con categoría
//  - brandId: relación con marca
//  - active: estado lógico

const { products } = require('../sharedData');

class ProductsService {
  constructor() {
    // Usa el arreglo compartido de productos
    this.products = products;
  }

  // Obtener todos los productos
  async getAll() {
    return this.products;
  }

  // Obtener producto por ID
  async getById(id) {
    return this.products.find(item => item.id === Number(id));
  }

  // Crear nuevo producto
  async create(data) {
    const newProduct = {
      id: this.products.length + 1,
      name: data.name || 'Sin nombre',
      description: data.description || 'Sin descripción',
      price: parseFloat(data.price) || 0,
      stock: data.stock ?? 0,
      image: data.image || 'https://placehold.co/400x300?text=Producto',
      categoryId: Number(data.categoryId),
      brandId: Number(data.brandId),
      active: data.active ?? true
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // Actualizar producto existente
  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === Number(id));
    if (index === -1) throw new Error('Producto no encontrado');
    const product = this.products[index];
    this.products[index] = { ...product, ...changes };
    return this.products[index];
  }

  // Eliminar producto
  async delete(id) {
    const index = this.products.findIndex(item => item.id === Number(id));
    if (index === -1) return null;
    this.products.splice(index, 1);
    return { id: Number(id) };
  }
}

module.exports = ProductsService;
