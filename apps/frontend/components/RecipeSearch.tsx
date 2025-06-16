'use client';

import { useEffect, useState } from 'react';
import { getCategories, getAreas } from '../lib/api';
import useDebounce from '../hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUpdatedSearchParams } from '../utils/searchHelper';
import { searchParamsKeys } from '../constant/searchParams';
import { routePaths } from '../constant/routePaths';
import { Area, Category } from '../types/recipe';

export function RecipeSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearchValue = useDebounce(searchQuery);
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get(searchParamsKeys.CATEGORY) || '';
  const area = searchParams.get(searchParamsKeys.AREA) || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, areasResponse] = await Promise.all([
          getCategories(),
          getAreas(),
        ]);

        const categoriesData: any = categoriesResponse;
        const areasData: any = areasResponse;

        setCategories(categoriesData);
        setAreas(areasData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (debouncedSearchValue.trim().length !== 0) {
      const newSearchParams = getUpdatedSearchParams(searchParams, {
        [searchParamsKeys.Q]: debouncedSearchValue,
      });

      router.push(`${routePaths.recipes.root}?${newSearchParams}`);
    }
  }, [debouncedSearchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const newSearchParams = getUpdatedSearchParams(searchParams, {
      [searchParamsKeys.Q]: searchQuery,
    });

    router.push(`${routePaths.recipes.root}?${newSearchParams}`);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    const newSearchParams = getUpdatedSearchParams(searchParams, {
      [searchParamsKeys.CATEGORY]: newCategory.length > 0 ? newCategory : null,
    });

    router.push(`${routePaths.recipes.root}?${newSearchParams}`);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newArea = e.target.value;
    const newSearchParams = getUpdatedSearchParams(searchParams, {
      [searchParamsKeys.AREA]: newArea.length > 0 ? newArea : null,
    });

    router.push(`${routePaths.recipes.root}?${newSearchParams}`);
  };

  const handleReset = () => {
    const newSearchParams = getUpdatedSearchParams(searchParams, {
      [searchParamsKeys.Q]: null,
      [searchParamsKeys.CATEGORY]: null,
      [searchParamsKeys.AREA]: null,
    });

    setSearchQuery('');

    router.push(`${routePaths.recipes.root}?${newSearchParams}`);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>
      <div className="flex gap-4 flex-wrap">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        >
          <option value="">All Categories</option>
          {categories.map(({ strCategory }) => (
            <option key={strCategory} value={strCategory}>
              {strCategory}
            </option>
          ))}
        </select>

        <select
          value={area}
          onChange={handleAreaChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        >
          <option value="">All Areas</option>
          {areas.map(({ strArea }) => (
            <option key={strArea} value={strArea}>
              {strArea}
            </option>
          ))}
        </select>

        <button onClick={handleReset} className="btn btn-primary">
          Reset
        </button>
      </div>
    </div>
  );
}
