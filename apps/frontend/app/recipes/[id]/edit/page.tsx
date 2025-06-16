import { notFound, redirect } from 'next/navigation';
import { PageHeader } from '../../../../components/PageHeader';
import RecipeForm from '../../../../components/RecipeForm';
import { getAreas, getCategories, getRecipe, updateRecipe } from '../../../../lib/api';
import { UpdateRecipeInput } from '../../../../types/recipe';
import ErrorFallback from '../../../../components/common/errors/ErrorFallback';

interface EditRecipePageProps {
  params: {
    id: string;
  };
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const recipe = await getRecipe(params.id);
  const categories = await getCategories();
  const areas = await getAreas();

  if (!recipe) {
    notFound();
  }

  async function handleSubmit(data: UpdateRecipeInput) {
    'use server';

    await updateRecipe(params.id, data);
    redirect(`/recipes/${params.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <ErrorFallback>
        <PageHeader title="Edit Recipe" />
      </ErrorFallback>

      <ErrorFallback>
        <RecipeForm
          initialData={recipe}
          onSubmit={handleSubmit}
          submitLabel="Update Recipe"
          categories={categories}
          areas={areas}
        />
      </ErrorFallback>
    </div>
  );
}
