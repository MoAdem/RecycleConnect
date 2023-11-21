import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'RecycleConnect API',
      description: 'RecycleConnect API Information',
      contact: {
        name: 'Amazing Developer',
      },
      servers: ['http://localhost:5000'],
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;