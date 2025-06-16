import { Router } from 'express';
import { getAllAreas } from './area.controller';

const areaRouter = Router();

areaRouter.get('/', getAllAreas);

export default areaRouter;