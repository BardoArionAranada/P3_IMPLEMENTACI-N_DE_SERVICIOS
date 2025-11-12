// Archivo: models/Product.js
// Descripción:
// Modelo de productos adaptado para IDs numéricos (en lugar de ObjectId).
// Compatible con relaciones a categorías y marcas por medio de enteros.

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true }, // ID numérico
    name: { type: String, required: true },
    description: { type: String, default: 'Sin descripción' },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    image: { type: String, default: 'https://placehold.co/400x300?text=Producto' },
    categoryId: { type: Number, ref: 'Category', required: true },
    brandId: { type: Number, ref: 'Brand', required: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Product', productSchema, 'products');
