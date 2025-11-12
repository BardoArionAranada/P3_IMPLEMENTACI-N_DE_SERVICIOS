// Archivo: db.js
// Descripción: Conexión a MongoDB Atlas usando Mongoose, dirigida a una base específica.

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://arionaranda:trivaille15s2002*.@clusterapi712.7d8zxwp.mongodb.net/api_geoRef712'
    );
    console.log(' Conexión exitosa a MongoDB Atlas (api_geoRef712)');
  } catch (error) {
    console.error(' Error al conectar con MongoDB Atlas:', error.message);
  }
};

module.exports = connectDB;
