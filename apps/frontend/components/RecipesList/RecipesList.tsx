'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { searchParamsKeys } from '../../constant/searchParams';
import { GetRecipesResponse } from '../../types/recipe';
import { getUpdatedSearchParams } from '../../utils/searchHelper';
import Pagination from '../common/Pagination';
import RecipeItem from '../common/RecipeItem';
import { routePaths } from '../../constant/routePaths';

const RecipesList = ({
  initialRecipesData: { recipes, totalRecipes },
  noData = 'No recipes found',
  routePath = routePaths.recipes.root,
}: {
  initialRecipesData: GetRecipesResponse;
  noData?: string;
  routePath?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get(searchParamsKeys.PAGE)) || 1;
  const itemsPerPage = Number(searchParams.get(searchParamsKeys.LIMIT)) || 9;

  const handleChangeItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    const newSearchParams = getUpdatedSearchParams(searchParams, {
      [searchParamsKeys.LIMIT]: newLimit,
      [searchParamsKeys.PAGE]: '1',
    });

    router.push(`${routePath}?${newSearchParams}`);
  };

  return (
    <>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))}

          <Pagination
            count={totalRecipes}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            handleChangeItemsPerPage={handleChangeItemsPerPage}
            routePath={routePath}
          />
        </div>
      ) : (
        <div className="text-center text-gray-600">{noData}</div>
      )}
    </>
  );
};

export default RecipesList;
