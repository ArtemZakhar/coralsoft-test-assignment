import { Router } from 'express';
import {
  httpCreateNewRecipe,
  httpDeleteRecipeById,
  httpGetRecipes,
  httpGetRandomRecipe,
  httpGetRecipeById,
  httpGetStarredRecipes,
  httpUpdateRecipeById,
  httpPostRecipeStarById,
} from './recipe.controller';
import {
  validateCreateRecipe,
  validateUpdateRecipe,
  validateGetRecipes,
  validateRecipeId,
} from '../../middleware/validators/recipe.validator';

const recipeRouter = Router();

recipeRouter.get('/random', httpGetRandomRecipe);
recipeRouter.get('/starred', httpGetStarredRecipes);

recipeRouter.get('/', validateGetRecipes, httpGetRecipes);
recipeRouter.post('/', validateCreateRecipe, httpCreateNewRecipe);

recipeRouter.get('/:id', validateRecipeId, httpGetRecipeById);
recipeRouter.put('/:id', validateUpdateRecipe, httpUpdateRecipeById);
recipeRouter.delete('/:id', validateRecipeId, httpDeleteRecipeById);

recipeRouter.post('/:id/toggle-star', validateRecipeId, httpPostRecipeStarById);

export default recipeRouter;
