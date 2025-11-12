// Archivo: models/Brand.js
// Descripción: Modelo de marca con _id numérico (entero) para uso en MongoDB Atlas.

const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true }, // ID numérico manual
    name: { type: String, required: true },
    country: { type: String, default: 'Desconocido' },
    description: { type: String, default: 'Sin descripción' },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Brand', brandSchema, 'brands');
