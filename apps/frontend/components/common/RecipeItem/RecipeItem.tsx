'use client';

import Link from 'next/link';
import { useState } from 'react';
import { updateRecipeStar } from '../../../app/actions/updateRecipeStar';
import { routePaths } from '../../../constant/routePaths';
import { Recipe } from '../../../types/recipe';
import EditButton from '../buttons/EditButton';

interface RCProps {
  recipe: Recipe;
}

export default function RecipeItem({ recipe: initialRecipe }: RCProps) {
  const [recipe, setRecipe] = useState(initialRecipe);

  const handleToggleStar = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const updatedRecipe = await updateRecipeStar(recipe.id);

      setRecipe(updatedRecipe);
    } catch (error) {
      console.error('Failed to toggle star:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {recipe.image && <img src={recipe.image} alt={recipe.name} className="h-48 object-contain" />}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>

        <div className="flex gap-2 mb-2">
          {recipe.category && (
            <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-md text-sm">
              {recipe.category}
            </span>
          )}

          {recipe.area && (
            <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-md text-sm">
              {recipe.area}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={handleToggleStar}
              className={`btn ${recipe.isStarred ? 'btn-primary' : 'btn-secondary'}`}
            >
              {recipe.isStarred ? '★' : '☆'}
            </button>

            <Link href={routePaths.recipes.byId(recipe.id)} className="btn btn-primary">
              View Recipe
            </Link>
          </div>

          <EditButton path={routePaths.recipes.edit(recipe.id)} />
        </div>
      </div>
    </div>
  );
}
