import { apiPaths } from '../constants/apiRoutes';
import { mealNormalizer } from '../helpers/mealNormalizer';
import {
  Area,
  AreasResponse,
  CategoriesResponse,
  Category,
  RandomMealResponse,
} from '../types/meal';
import { Recipe } from '../types/recipe';
import axiosInstance from '../utils/axiosInstance';

export async function getCategories(): Promise<Category[]> {
  try {
    const { meals } = (await axiosInstance.get<CategoriesResponse>(apiPaths.categories)).data;
    return meals;
  } catch (error) {
    console.error('Error fetching categories from TheMealDB:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getAreas(): Promise<Area[]> {
  try {
    const { meals } = (await axiosInstance.get<AreasResponse>(apiPaths.areas)).data;
    return meals;
  } catch (error) {
    console.error('Error fetching areas from TheMealDB:', error);
    throw new Error('Failed to fetch areas');
  }
}

export async function getRandomRecipe(): Promise<Recipe> {
  try {
    const { meals } = (await axiosInstance.get<RandomMealResponse>(apiPaths.randomMeal)).data;

    return mealNormalizer(meals[0]);
  } catch (error) {
    console.error('Error fetching random recipe from TheMealDB:', error);
    throw new Error('Failed to fetch random recipe');
  }
}
