// Archivo: swagger.js
// Descripción:
// Configuración de la documentación Swagger de la API (Users, Categories, Brands y Products).
// Compatible con MongoDB Atlas y estructura modular de rutas.

// importaciones
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de la API – P3_Implementación_de_Servicios',
      version: '1.0.1',
      description:
        'API REST desarrollada con Node.js, Express y MongoDB Atlas. Incluye módulos de Users, Categories, Brands y Products con relaciones y validaciones.',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Servidor local de desarrollo',
      },
    ],
  },
  apis: ['./routes/*.js'], // rutas donde están definidas las anotaciones Swagger
};

// genera la especificación de Swagger
const swaggerSpec = swaggerJSDoc(options);

// función para montar Swagger en la app
function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(' Documentación Swagger disponible en http://localhost:3000/api-docs');
}

module.exports = setupSwagger;
