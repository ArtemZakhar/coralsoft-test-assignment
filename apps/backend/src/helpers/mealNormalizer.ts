import { MealResponseType } from '../types/meal';
import { Recipe } from '../types/recipe';

export const mealNormalizer = (meal: MealResponseType): Recipe => ({
  id: Math.random().toString(36).substring(2, 9),
  name: meal.strMeal,
  description: meal.strInstructions?.substring(0, 200) || '',
  category: meal.strCategory,
  area: meal.strArea,
  tags: meal.strTags ?? '',
  measure: meal.strMeasure1,
  ingredients: Object.entries(meal).reduce((acc, [key, value]) => {
    if (key.startsWith('strIngredient') && value) {
      acc.push(value as string);
    }

    return acc;
  }, [] as string[]),
  instructions: meal.strInstructions || '',
  image: meal.strMealThumb,
  isStarred: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
