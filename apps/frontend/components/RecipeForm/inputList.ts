import { CreateRecipeInput } from '../../types/recipe';

type Input = {
  label: string;
  name: keyof CreateRecipeInput;
  type: string;
  required?: boolean;
  rows?: number;
};

type InputListType = {
  mainInfoBlock: Input[];
  mealStatsBlock: Input[];
  mealClassificationBlock: Input[];
};

export const inputList: InputListType = {
  mainInfoBlock: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      label: 'Description',
      name: 'description',
      type: 'textarea',
      rows: 3,
    },
    {
      label: 'Ingredients',
      name: 'ingredients',
      type: 'text',
      required: true,
    },
    {
      label: 'Instructions',
      name: 'instructions',
      type: 'textarea',
      required: true,
      rows: 6,
    },
    {
      label: 'Image URL',
      name: 'image',
      type: 'url',
    },
  ],

  mealStatsBlock: [
    {
      label: 'Prep Time (minutes)',
      name: 'prepTime',
      type: 'number',
    },
    {
      label: 'Cook Time (minutes)',
      name: 'cookTime',
      type: 'number',
    },
    {
      label: 'Servings',
      name: 'servings',
      type: 'number',
    },
  ],

  mealClassificationBlock: [
    {
      label: 'Category',
      name: 'category',
      type: 'select',
    },
    {
      label: 'Area',
      name: 'area',
      type: 'select',
    },
    {
      label: 'Starred',
      name: 'isStarred',
      type: 'checkbox',
    },
  ],
};
