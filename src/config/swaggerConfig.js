import swaggerJsdoc from 'swagger-jsdoc';
import { PORT } from './config.js';

const documentation = `./documentation/**/*.yaml`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task manager',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ]
  },
  apis: [documentation]
};

const specs = swaggerJsdoc(options);
export default specs;