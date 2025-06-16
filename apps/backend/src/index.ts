import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from './middleware/error-handler';
import { recipeService } from './services/recipeService';
import swaggerSpec from './swagger';
import router from './routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve as any, swaggerUi.setup(swaggerSpec) as any);

app.use(errorHandler);

recipeService.seedRecipes().catch(console.error);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
