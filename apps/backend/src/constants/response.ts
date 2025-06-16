export const responseCodesAndMsg = {
  codes: {
    [200]: 200,
    [201]: 201,
    [204]: 204,
    [400]: 400,
    [404]: 404,
    [500]: 500,
  },
  messages: {
    error: {
      getRecipes: 'Failed to fetch recipes',
      recipeNotFound: 'Recipe not found',
      getRecipe: 'Failed to fetch recipe',
      createRecipe: 'Failed to create recipe',
      updateRecipe: 'Failed to update recipe',
      deleteRecipe: 'Failed to delete recipe',
      randomRecipe: 'Failed to fetch random recipe',
      starredRecipes: 'Failed to fetch starred recipes',
      toggleStar: 'Failed to toggle star status',
      getCategories: 'Failed to fetch categories',
      getAreas: 'Failed to fetch areas',
      internalServerError: 'Internal server error',
      validationError: 'Validation error',
    },
  },
};
