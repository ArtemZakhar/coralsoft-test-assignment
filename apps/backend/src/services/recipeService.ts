import { apiPaths } from '../constants/apiRoutes';
import { mealNormalizer } from '../helpers/mealNormalizer';
import { paginatedRecipes } from '../helpers/recipePagination';
import {
  CreateRecipeInput,
  Recipe,
  RecipeDataType,
  RecipeResponseType,
  UpdateRecipeInput,
} from '../types/recipe';
import axiosInstance from '../utils/axiosInstance';

const MAX_RECIPES = 30;
class RecipeService {
  private recipes: Recipe[] = [];
  private totalRecipes = 0;

  async getAllRecipes({
    searchQuery = '',
    page,
    limit,
    category,
    area,
  }: {
    page: number;
    limit: number;
    searchQuery?: string;
    category?: string;
    area?: string;
  }): Promise<RecipeDataType> {
    return paginatedRecipes({
      page,
      limit,
      searchQuery,
      category,
      area,
      recipes: this.recipes,
      totalRecipes: this.totalRecipes,
    });
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    return this.recipes.find((recipe) => recipe.id === id) || null;
  }

  async createRecipe(input: CreateRecipeInput): Promise<Recipe> {
    const now = new Date().toISOString();
    const recipe: any = {
      ...input,
      id: Math.random().toString(36).substring(2, 9),
      isStarred: true,
      createdAt: now,
      updatedAt: now,
    };
    this.recipes.push(recipe);
    this.totalRecipes += 1;
    return recipe;
  }

  async updateRecipe(id: string, input: UpdateRecipeInput): Promise<Recipe | null> {
    let updatedRecipe: Recipe | null = null;
    const updatedRecipes = this.recipes.map((recipe) => {
      if (recipe.id === id) {
        const newRecipe = { ...recipe, ...input, updatedAt: new Date().toISOString() };

        updatedRecipe = newRecipe;
        return newRecipe;
      }

      return recipe;
    });

    this.recipes = updatedRecipes;
    return updatedRecipe;
  }

  async deleteRecipe(id: string): Promise<boolean> {
    const quantity = this.recipes.length;

    this.recipes = this.recipes.filter((recipe) => {
      if (recipe.id !== id) {
        return true;
      }

      this.totalRecipes -= 1;

      return false;
    });

    return quantity !== this.recipes.length;
  }

  async seedRecipes(): Promise<void> {
    try {
      const { meals } = (await axiosInstance.get<RecipeResponseType>(apiPaths.recipes)).data;

      if (!!meals.length) {
        const normalizedMeals: Recipe[] = [];

        const maxRecipes = Math.min(MAX_RECIPES, meals.length);

        for (let i = 0; i < maxRecipes; i += 1) {
          normalizedMeals.push(mealNormalizer(meals[i]));
        }

        this.recipes = normalizedMeals;
        this.totalRecipes = normalizedMeals.length;
      }
    } catch (error) {
      console.error('Failed to seed recipes:', error);
    }
  }

  async toggleStar(id: string): Promise<Recipe | null> {
    let updatedRecipe: Recipe | null = null;
    const updatedRecipes = this.recipes.map((recipe) => {
      if (recipe.id === id) {
        const newRecipe = { ...recipe, isStarred: !recipe.isStarred };

        updatedRecipe = newRecipe;
        return newRecipe;
      }

      return recipe;
    });

    this.recipes = updatedRecipes;
    return updatedRecipe;
  }

  async getStarredRecipes({
    searchQuery = '',
    page,
    limit,
  }: {
    page: number;
    limit: number;
    searchQuery?: string;
  }): Promise<RecipeDataType> {
    const starredRecipes = this.recipes.filter((recipe) => recipe.isStarred);
    
    return paginatedRecipes({
      page,
      limit,
      searchQuery,
      recipes: starredRecipes,
      totalRecipes: starredRecipes.length,
    });
  }
}

export const recipeService = new RecipeService();
