import { Router } from 'express';
import { httpGetAllCategories } from './categories.controller';

const categoriesRouter = Router();

categoriesRouter.get('/', httpGetAllCategories);

export default categoriesRouter;