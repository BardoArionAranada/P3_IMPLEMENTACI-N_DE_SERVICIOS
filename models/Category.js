// Archivo: models/Category.js
// Descripción: Modelo de categoría con _id numérico compatible con MongoDB Atlas.

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true }, // ID numérico manual
    name: { type: String, required: true },
    description: { type: String, default: 'Sin descripción' },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// ⚠️ Esta línea elimina el conflicto con el ObjectId interno
categorySchema.set('_id', false);

module.exports = mongoose.model('Category', categorySchema, 'categories');
