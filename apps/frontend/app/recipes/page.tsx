import Link from 'next/link';
import ErrorFallback from '../../components/common/errors/ErrorFallback';
import { RecipeSearch } from '../../components/RecipeSearch';
import RecipesList from '../../components/RecipesList';
import { getRecipes } from '../../lib/api';
import { searchParamsToString } from '../../utils/searchHelper';

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const recipesData = await getRecipes(searchParamsToString(searchParams));

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <div className="flex gap-2">
          <Link href="/recipes/starred" className="btn btn-secondary">
            View Starred
          </Link>
          <Link href="/recipes/new" className="btn btn-primary">
            Add New Recipe
          </Link>
        </div>
      </div>

      <RecipeSearch />

      <ErrorFallback>
        <RecipesList initialRecipesData={recipesData} />
      </ErrorFallback>
    </div>
  );
}
