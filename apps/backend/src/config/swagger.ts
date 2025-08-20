import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AmberOps Backend API',
      version: '1.0.0',
      description: 'The REST API service for all AmberOps application data. This documentation provides a live, interactive way to explore and test API endpoints.',
    },
    servers: [
      {
        url: 'http://localhost:3004/api/v1',
        description: 'Development server'
      },
       {
        url: 'https://amberops-backend.onrender.com/api/v1',
        description: 'Production server'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
        }
      }
    },
    security: [
        {
            bearerAuth: []
        }
    ]
  },
  // Correctly resolve the paths to the route files
  apis: [
    path.join(process.cwd(), 'apps/backend/src/api/routes/*.ts'),
    path.join(process.cwd(), 'apps/backend/src/api/public.router.ts'),
  ], 
};

const specs = swaggerJsdoc(options);
export default specs;
