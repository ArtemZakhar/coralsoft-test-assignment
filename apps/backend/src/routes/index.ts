import { Router } from 'express';
import recipeRouter from './recipe/recipe.router';
import categoriesRouter from './categories/categories.router';
import areaRouter from './area/area.router';

const router = Router();

router.use('/recipes', recipeRouter);
router.use('/categories', categoriesRouter);
router.use('/areas', areaRouter);

export default router; 
