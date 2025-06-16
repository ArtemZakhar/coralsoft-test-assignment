import { Recipe } from '../types/recipe';

export const paginatedRecipes = ({
  page,
  limit,
  searchQuery,
  category,
  area,
  recipes,
  totalRecipes,
}: {
  totalRecipes: number;
  recipes: Recipe[];
  page: number;
  limit: number;
  searchQuery: string;
  category?: string;
  area?: string;
}) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const isNoFilters = !searchQuery.length && !category && !area;

  if (isNoFilters) {
    return { recipes: recipes.slice(startIndex, endIndex), totalRecipes: totalRecipes };
  }

  let filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(
        (ingredient) => ingredient.toLowerCase() === searchQuery.toLowerCase()
      )
  );

  if (category) {
    filteredRecipes = filteredRecipes.filter((recipe) => recipe.category === category);
  }

  if (area) {
    filteredRecipes = filteredRecipes.filter((recipe) => recipe.area === area);
  }

  return {
    recipes: filteredRecipes.slice(startIndex, endIndex),
    totalRecipes: filteredRecipes.length,
  };
};
