// importaciones
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de la API – P1_Swagger',
      version: '1.0.0',
      description: 'Documentación de la API de la práctica P1 (Users, Categories, Brands y Products) usando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./routes/*.js'], // ruta donde están las rutas
};

// genera la especificación de Swagger
const swaggerSpec = swaggerJSDoc(options);

// función para montar Swagger en la app
function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(' Documentación Swagger disponible en http://localhost:3000/api-docs');
}

module.exports = setupSwagger;
