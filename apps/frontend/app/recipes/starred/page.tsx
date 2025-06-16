import { getStarredRecipes } from '../../../lib/api';

import { PageHeader } from '../../../components/PageHeader';
import RecipesList from '../../../components/RecipesList';
import { routePaths } from '../../../constant/routePaths';
import { searchParamsToString } from '../../../utils/searchHelper';
import ErrorFallback from '../../../components/common/errors/ErrorFallback';

export default async function StarredRecipesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const recipes = await getStarredRecipes(searchParamsToString(searchParams));
  return (
    <div className="container mx-auto p-4">
      <ErrorFallback>
        <PageHeader title="Starred Recipes" backPath={routePaths.recipes.root} />
      </ErrorFallback>

      <ErrorFallback>
        <RecipesList
          initialRecipesData={recipes}
          noData="No starred recipes yet"
          routePath={routePaths.recipes.starred}
        />
      </ErrorFallback>
    </div>
  );
}
