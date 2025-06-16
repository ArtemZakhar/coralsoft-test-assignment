import { notFound, redirect } from 'next/navigation';
import DeleteButton from '../../../components/common/buttons/DeleteButton';
import EditButton from '../../../components/common/buttons/EditButton';
import { PageHeader } from '../../../components/PageHeader';
import { routePaths } from '../../../constant/routePaths';
import { deleteRecipe, getRecipe } from '../../../lib/api';
import ErrorFallback from '../../../components/common/errors/ErrorFallback';

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipeDetailsPage({ params }: RecipePageProps) {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    notFound();
  }

  async function handleDelete() {
    'use server';

    try {
      await deleteRecipe(params.id);
      redirect('/recipes');
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      throw error;
    }
  }

  return (
    <div className="container mx-auto p-4">
      <ErrorFallback>
        <PageHeader
          title={recipe.name}
          extraButtons={
            <div className="flex gap-2">
              <EditButton path={routePaths.recipes.edit(recipe.id)} />

              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </div>
          }
        />
      </ErrorFallback>

      {!!recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {!!recipe.prepTime && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Prep Time</h3>

            <p>{recipe.prepTime} minutes</p>
          </div>
        )}

        {!!recipe.cookTime && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Cook Time</h3>

            <p>{recipe.cookTime} minutes</p>
          </div>
        )}

        {!!recipe.servings && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Servings</h3>

            <p>{recipe.servings}</p>
          </div>
        )}
      </div>

      {!!recipe.description && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>

          <p className="text-gray-600">{recipe.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>

          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>

          <p className="whitespace-pre-line text-gray-600">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}
