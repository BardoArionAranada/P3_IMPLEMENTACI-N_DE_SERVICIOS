// Archivo: services/brandsService.js
// Descripción:
// Servicio de marcas. Ahora utiliza los datos compartidos desde sharedData.js,
// evitando la creación de arreglos independientes con Faker.
// Esto garantiza que las marcas estén sincronizadas con productos y otras entidades.

const { brands } = require('../sharedData');

class BrandsService {
  constructor() {
    // En lugar de generar marcas nuevas, usa el arreglo compartido
    this.brands = brands;
  }

  // Obtener todas las marcas
  async getAll() {
    return this.brands;
  }

  // Obtener marca por ID
  async getById(id) {
    return this.brands.find(item => item.id === Number(id));
  }

  // Crear nueva marca
  async create(data) {
    const newBrand = {
      id: this.brands.length + 1,
      name: data.name || 'Sin nombre',
      country: data.country || 'Desconocido',
      description: data.description || 'Sin descripción',
      active: data.active ?? true
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  // Actualizar marca
  async update(id, changes) {
    const index = this.brands.findIndex(item => item.id === Number(id));
    if (index === -1) throw new Error('Marca no encontrada');
    const brand = this.brands[index];
    this.brands[index] = { ...brand, ...changes };
    return this.brands[index];
  }

  // Eliminar marca
  async delete(id) {
    const index = this.brands.findIndex(item => item.id === Number(id));
    if (index === -1) return null;
    this.brands.splice(index, 1);
    return { id: Number(id) };
  }
}

module.exports = BrandsService;
