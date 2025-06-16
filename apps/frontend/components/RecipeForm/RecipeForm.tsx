'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getRandomRecipe } from '../../lib/api';
import { Area, Category, CreateRecipeInput, Recipe, UpdateRecipeInput } from '../../types/recipe';
import MainInfoInputsBlock from './MainInfoInputsBlock';
import MealClassificationInputsBlock from './MealClassificationInputsBlock';
import MealStatsInputsBlock from './MealStatsInputsBlock';
interface RecipeFormProps {
  initialData?: Partial<Recipe>;
  onSubmit: (data: CreateRecipeInput | UpdateRecipeInput) => Promise<void>;
  submitLabel: string;
  categories: Category[];
  areas: Area[];
}

export default function RecipeForm({
  initialData,
  onSubmit,
  submitLabel,
  categories,
  areas,
}: RecipeFormProps) {
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<CreateRecipeInput>({
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      ingredients: initialData?.ingredients ?? [''],
      instructions: initialData?.instructions ?? '',
      image: initialData?.image ?? '',
      prepTime: initialData?.prepTime ?? 0,
      cookTime: initialData?.cookTime ?? 0,
      servings: initialData?.servings ?? 0,
      category: initialData?.category ?? '',
      area: initialData?.area ?? '',
      isStarred: initialData?.isStarred ?? true,
    },
  });

  const onFormSubmit = async (data: CreateRecipeInput) => {
    await onSubmit(data);
    setIsLoading(false);
  };

  const handleRandomize = async () => {
    const randomRecipe = await getRandomRecipe();

    form.reset({
      name: randomRecipe.name,
      description: randomRecipe.description,
      ingredients: randomRecipe.ingredients,
      instructions: randomRecipe.instructions,
      image: randomRecipe.image || undefined,
      prepTime: randomRecipe.prepTime,
      cookTime: randomRecipe.cookTime,
      servings: randomRecipe.servings,
      category: randomRecipe.category,
      area: randomRecipe.area,
      isStarred: false,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6" noValidate>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recipe Details</h2>

        {!initialData && (
          <button type="submit" onClick={handleRandomize} className="btn btn-primary">
            Randomize
          </button>
        )}
      </div>

      <MainInfoInputsBlock form={form} />

      <MealStatsInputsBlock form={form} />

      <MealClassificationInputsBlock form={form} categories={categories} areas={areas} />

      <button type="submit" disabled={!isLoading} className="btn btn-primary w-full">
        {isLoading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
