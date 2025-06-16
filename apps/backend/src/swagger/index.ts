import swaggerJSDoc, { Options, SwaggerDefinition } from 'swagger-jsdoc';
import dotenv from 'dotenv';
import { recipeSchema } from './schemas/recipe.schema';
import { commonSchema } from './schemas/common.schema';
import { categorySchema } from './schemas/category.schema';
import { areaSchema } from './schemas/area.schema';

dotenv.config();

const definition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Recipe API',
    version: '1.0.0',
    description: 'API for Coralsoft test assignment',
  },
  servers: [
    {
      url: process.env.HOST_URL,
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      ...recipeSchema,
      ...commonSchema,
      ...categorySchema,
      ...areaSchema,
    },
  },
};

const options: Options = {
  definition,
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
