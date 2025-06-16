import { revalidateData } from '../app/actions/revalidateData';
import { apiPaths } from '../constant/apiPaths';
import {
  Area,
  Category,
  CreateRecipeInput,
  GetRecipesResponse,
  Recipe,
  UpdateRecipeInput,
} from '../types/recipe';
import { client } from '../utils/client';

const RECIPES_TAG = 'recipes';
const STARRED_RECIPE_TAG = 'starred-recipes';
const RECIPE_TAG = 'recipe';

export async function getRecipes(query?: string): Promise<GetRecipesResponse> {
  try {
    let url = apiPaths.recipes.root;

    if (query) {
      url += `?${query}`;
    }
    const data = await client.get<GetRecipesResponse>({
      url,
      tags: [RECIPES_TAG],
      noCache: true,
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch recipes: ', error);
    throw error;
  }
}

export async function getRecipe(id: string): Promise<Recipe> {
  try {
    return await client.get<Recipe>({
      url: apiPaths.recipes.byId(id),
      tags: [`${RECIPE_TAG}-${id}`],
    });
  } catch (error) {
    console.error('Failed to fetch recipe: ', error);
    throw error;
  }
}

export async function createRecipe(data: CreateRecipeInput): Promise<Recipe> {
  try {
    const newRecipe = await client.post<Recipe>({ url: apiPaths.recipes.root, data });
    revalidateData([RECIPES_TAG]);
    return newRecipe;
  } catch (error) {
    console.error('Failed to create recipe', error);
    throw error;
  }
}

export async function updateRecipe(id: string, data: UpdateRecipeInput): Promise<Recipe> {
  try {
    const newRecipe = await client.put<Recipe>({ url: apiPaths.recipes.byId(id), data });
    revalidateData([RECIPES_TAG, STARRED_RECIPE_TAG, `${RECIPE_TAG}-${id}`]);

    return newRecipe;
  } catch (error) {
    console.error('Failed to update recipe: ', error);
    throw error;
  }
}

export async function deleteRecipe(id: string): Promise<void> {
  try {
    await client.delete({ url: apiPaths.recipes.byId(id) });
    revalidateData([RECIPES_TAG]);
  } catch (error) {
    console.error('Failed to delete recipe: ', error);
    throw error;
  }
}

export async function getRandomRecipe(): Promise<Recipe> {
  try {
    const data = await client.get<Recipe>({ url: apiPaths.recipes.random });
    return data;
  } catch (error) {
    console.error('Failed to fetch random recipe: ', error);
    throw error;
  }
}

export async function getStarredRecipes(query?: string): Promise<GetRecipesResponse> {
  try {
    let url = apiPaths.recipes.starred;

    if (query) {
      url += `?${query}`;
    }

    const data = await client.get<GetRecipesResponse>({
      url: url,
      tags: [STARRED_RECIPE_TAG],
      noCache: true,
    });

    return data;
  } catch (error) {
    console.error('Failed to fetch starred recipes: ', error);
    throw error;
  }
}

export async function toggleStar(id: string): Promise<Recipe> {
  const data = await client.post<Recipe>({ url: apiPaths.recipes.toggleStar(id) });
  revalidateData([RECIPES_TAG, STARRED_RECIPE_TAG]);
  return data;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await client.get<Category[]>({ url: apiPaths.categories.root });
    return data;
  } catch (error) {
    console.error('Failed to fetch categories: ', error);
    throw error;
  }
}

export async function getAreas(): Promise<Area[]> {
  try {
    const data = await client.get<Area[]>({ url: apiPaths.areas.root });
    return data;
  } catch (error) {
    console.error('Failed to fetch areas: ', error);
    throw error;
  }
}
