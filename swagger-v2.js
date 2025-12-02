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
  
  tags: [ 
        {
            name: 'Students',
            description: 'API for managing student records',
        },
        {
            name: 'Courses',
            description: 'API for managing course catalog',
        },
        {
            name: 'Enrollment',
            description: 'API for student enrollment and grades',
        },
    ],
  
  // 1. ADD THE 'components' OBJECT HERE
  components: { // <--- ADDED OPENING BRACE
    
    schemas: { // <--- 'schemas' is a property of 'components'
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
    
  }, // <--- ADDED CLOSING BRACE for 'components'

}; // <--- The extra closing brace was likely here, causing the SyntaxError

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // IMPORTANT: Ensure these paths match the new file structure (no 'src/' prefix)
  apis: [
    './routes/*.js', // Assuming your route files are here
    './models/*.js', 
    './index.js' // Change to index.js if that is your main server file
  ], 
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);


export default swaggerSpec;








