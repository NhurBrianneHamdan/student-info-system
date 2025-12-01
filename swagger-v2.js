// swagger.js (create this file in your backend directory)

import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  // Your API definition
  openapi: '3.0.0',
  info: {
    title: 'Student Information System API', // Title of your API
    version: '2.0.0', // Version of the API
    description: 'API documentation for the Student Information System backend.',
  },
  servers: [
    {
      url: `${process.env.BASE_URL}/api/v2`, 
      description: 'Render Cloud server for V2',
    },
  ],
    schemas: {
      Student: {
        type: 'object',
        required: ['firstName', 'lastName'],
        properties: {
          id: { type: 'string', description: 'Student ID' },
          firstName: { type: 'string', description: 'Student first name' },
          lastName: { type: 'string', description: 'Student last name' },
          email: { type: 'string', format: 'email' },
        },
      },
    },
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Path to the API docs: all files containing OpenAPI annotations
  // You might need to adjust this path based on your file structure
  apis: ['./routes/v2/*.js', './models/*.js', './server.js'], 
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);


export default swaggerSpec;





