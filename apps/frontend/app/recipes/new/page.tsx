import { redirect } from 'next/navigation';
import ErrorFallback from '../../../components/common/errors/ErrorFallback';
import { PageHeader } from '../../../components/PageHeader';
import RecipeForm from '../../../components/RecipeForm';
import { createRecipe, getAreas, getCategories } from '../../../lib/api';
import { CreateRecipeInput } from '../../../types/recipe';

export default async function NewRecipePage() {
  const categories = await getCategories();
  const areas = await getAreas();

  async function handleSubmit(data: CreateRecipeInput) {
    'use server';
    const recipe = await createRecipe(data as CreateRecipeInput);

    redirect(`/recipes/${recipe.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <ErrorFallback>
        <PageHeader title="New Recipe" />
      </ErrorFallback>

      <ErrorFallback>
        <RecipeForm
          onSubmit={handleSubmit}
          submitLabel="Create Recipe"
          categories={categories}
          areas={areas}
        />
      </ErrorFallback>
    </div>
  );
}
