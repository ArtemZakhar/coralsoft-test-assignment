export const recipeSchema = {
  Recipe: {
    type: 'object',
    required: ['id', 'name', 'description', 'category', 'area', 'ingredients', 'instructions'],
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      category: {
        type: 'string',
      },
      area: {
        type: 'string',
      },
      tags: {
        type: 'string',
      },
      measure: {
        type: 'string',
      },
      ingredients: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      instructions: {
        type: 'string',
      },
      image: {
        type: 'string',
      },
      prepTime: {
        type: 'string',
      },
      cookTime: {
        type: 'string',
      },
      servings: {
        type: 'string',
      },
      isStarred: {
        type: 'boolean',
        example: false,
      },
      createdAt: {
        type: 'string',
      },
      updatedAt: {
        type: 'string',
      },
    },
  },
  NewRecipe: {
    type: 'object',
    required: ['name', 'description', 'category', 'area', 'ingredients', 'instructions'],
    properties: {
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      category: {
        type: 'string',
      },
      area: {
        type: 'string',
      },
      tags: {
        type: 'string',
      },
      measure: {
        type: 'string',
      },
      ingredients: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      instructions: {
        type: 'string',
      },
      image: {
        type: 'string',
      },
      prepTime: {
        type: 'string',
      },
      cookTime: {
        type: 'string',
      },
      servings: {
        type: 'string',
      },
      isStarred: {
        type: 'boolean',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
  UpdateRecipe: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      category: { type: 'string' },
      area: { type: 'string' },
      tags: { type: 'string' },
      measure: { type: 'string' },
      ingredients: {
        type: 'array',
        items: { type: 'string' },
      },
      instructions: { type: 'string' },
      image: { type: 'string' },
      prepTime: { type: 'string' },
      cookTime: { type: 'string' },
      servings: { type: 'string' },
      isStarred: { type: 'boolean' },
    },
  },
};
