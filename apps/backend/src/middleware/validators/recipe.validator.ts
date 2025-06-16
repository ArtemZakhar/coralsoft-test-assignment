import { body, param, query } from 'express-validator';
import { validateRequest } from './validate-request';

export const validateCreateRecipe = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),

  body('ingredients')
    .isArray()
    .withMessage('Ingredients must be an array')
    .notEmpty()
    .withMessage('At least one ingredient is required'),

  body('instructions')
    .trim()
    .notEmpty()
    .withMessage('Instructions are required')
    .isLength({ min: 20 })
    .withMessage('Instructions must be at least 20 characters long'),

  body('image').optional().isURL().withMessage('Image must be a valid URL'),

  body('prepTime').optional(),

  body('cookTime').optional(),

  body('servings').optional(),

  validateRequest,
];

export const validateUpdateRecipe = [
  param('id').notEmpty().withMessage('Recipe ID is required'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),

  body('ingredients').optional().isArray().withMessage('Ingredients must be an array'),

  body('instructions')
    .optional()
    .trim()
    .isLength({ min: 20 })
    .withMessage('Instructions must be at least 20 characters long'),

  body('image').optional().isURL().withMessage('Image must be a valid URL'),

  body('prepTime').optional(),

  body('cookTime').optional(),

  body('servings').optional(),

  validateRequest,
];

export const validateGetRecipes = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  query('searchQuery').optional(),

  validateRequest,
];

export const validateRecipeId = [
  param('id').notEmpty().withMessage('Recipe ID is required'),

  validateRequest,
];
