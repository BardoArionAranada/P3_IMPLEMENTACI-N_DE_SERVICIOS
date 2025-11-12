// Archivo: models/User.js
// Descripción:
// Modelo de usuarios para MongoDB Atlas con IDs numéricos.
// Define la estructura de la colección "users" de manera consistente con las demás entidades.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true }, 
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: 'https://placehold.co/200x200?text=Avatar' },
    password: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema, 'users');
