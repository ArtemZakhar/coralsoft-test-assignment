import { recipeService } from '../../../services/recipeService';
import { Request, Response } from 'express';
import { CreateRecipeInput, UpdateRecipeInput } from '../../../types/recipe';
import { getRandomRecipe } from '../../../services/mealDbService';
import { responseCodesAndMsg } from '../../../constants/response';

/**
 * @swagger
 * tags: Recipes
 * description: API for handling recipes
 */

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Recipe on page
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: Query for recipe searching
 *     responses:
 *       200:
 *         description: List of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export const httpGetRecipes = async (req: Request, res: Response) => {
  try {
    const { page, limit, searchQuery, category, area } = req.query;

    const recipes = await recipeService.getAllRecipes({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 9,
      searchQuery: searchQuery as string,
      category: category as string | undefined,
      area: area as string | undefined,
    });

    return res.status(responseCodesAndMsg.codes[200]).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);

    return res
      .status(responseCodesAndMsg.codes[500])
      .json({ error: responseCodesAndMsg.messages.error.getRecipes });
  }
};

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: Recipe id
 *     responses:
 *       200:
 *         description: Recipe has been found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe has not been found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export const httpGetRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);

    if (!recipe) {
      return res
        .status(responseCodesAndMsg.codes[404])
        .json({ error: responseCodesAndMsg.messages.error.recipeNotFound });
    }

    return res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return res
      .status(responseCodesAndMsg.codes[500])
      .json({ error: responseCodesAndMsg.messages.error.getRecipe });
  }
};

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRecipe'
 *     responses:
 *       201:
 *         description: Recipe has been created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Incorrect input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorWithDetails'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export const httpCreateNewRecipe = async (req: Request, res: Response) => {
  try {
    const input = req.body as CreateRecipeInput;
    const recipe = await recipeService.createRecipe(input);
    return res.status(responseCodesAndMsg.codes[201]).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    return res
      .status(responseCodesAndMsg.codes[500])
      .json({ error: responseCodesAndMsg.messages.error.createRecipe });
  }
};

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Update recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: Recipe Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRecipe'
 *     responses:
 *       200:
 *         description: Recipe has been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Incorrect input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorWithDetails'
 *       404:
 *         description: Recipe has not been found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export const httpUpdateRecipeById = async (req: Request, res: Response) => {
  try {
    const input = req.body as UpdateRecipeInput;
    const recipe = await recipeService.updateRecipe(req.params.id, input);
    if (!recipe) {
      return res
        .status(responseCodesAndMsg.codes[404])
        .json({ error: responseCodesAndMsg.messages.error.recipeNotFound });
    }
    return res.status(responseCodesAndMsg.codes[200]).json(recipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    return res
      .status(responseCodesAndMsg.codes[500])
      .json({ error: responseCodesAndMsg.messages.error.updateRecipe });
  }
};

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: Recipe Id
 *     responses:
 *       204:
 *         description: Recipe has been deleted
 *       404:
 *         description: Recipe has not been found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export const httpDeleteRecipeById = async (req: Request, res: Response) => {
  try {
    const success = await recipeService.deleteRecipe(req.params.id);
    if (!success) {
      return res
        .status(responseCodesAndMsg.codes[404])
        .json({ error: responseCodesAndMsg.messages.error.recipeNotFound });
    }
    return res.status(responseCodesAndMsg.codes[204]).send();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res
      .status(responseCodesAndMsg.codes[500])
      .json({ error: responseCodesAndMsg.messages.error.deleteRecipe });
  }
};

/**
 * @swagger
 * /recipes/random:
 *   get:
 *     summary: Get random recipe
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Recipe has been found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export const httpGetRandomRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await getRandomRecipe();
    return res.status(responseCodesAndMsg.codes[200]).json(recipe);
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    return res
      .status(responseCodesAndMsg.codes[500])
      .json({ error: responseCodesAndMsg.messages.error.randomRecipe });
  }
};

/**
 * @swagger
 * /recipes/starred:
 *   get:
 *     summary: Get starred recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Recipe list has been found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export const httpGetStarredRecipes = async (req: Request, res: Response) => {
  try {
    const { page, limit, searchQuery } = req.query;

    const recipes = await recipeService.getStarredRecipes({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 9,
      searchQuery: searchQuery as string,
    });
    return res.status(responseCodesAndMsg.codes[200]).json(recipes);
  } catch (error) {
    console.error('Error fetching starred recipes:', error);
    return res
      .status(responseCodesAndMsg.codes[500])
      .json({ error: responseCodesAndMsg.messages.error.starredRecipes });
  }
};

/**
 * @swagger
 * /recipes/{id}/toggle-star:
 *   post:
 *     summary: Toggle star status for recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: Recipe id
 *     responses:
 *       200:
 *         description: Recipe status has been undated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe has not been found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export const httpPostRecipeStarById = async (req: Request, res: Response) => {
  try {
    const recipe = await recipeService.toggleStar(req.params.id);
    if (!recipe) {
      return res
        .status(responseCodesAndMsg.codes[404])
        .json({ error: responseCodesAndMsg.messages.error.recipeNotFound });
    }
    return res.status(responseCodesAndMsg.codes[200]).json(recipe);
  } catch (error) {
    console.error('Error toggling star status:', error);
    return res
      .status(responseCodesAndMsg.codes[500])
      .json({ error: responseCodesAndMsg.messages.error.toggleStar });
  }
};
