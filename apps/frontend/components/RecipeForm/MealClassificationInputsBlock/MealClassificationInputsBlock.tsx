import { Controller, UseFormReturn } from 'react-hook-form';
import { Area, Category, CreateRecipeInput } from '../../../types/recipe';
import { inputList } from '../inputList';

const MealClassificationInputsBlock = ({
  form: { control },
  categories,
  areas,
}: {
  form: UseFormReturn<CreateRecipeInput, any, CreateRecipeInput>;
  categories: Category[];
  areas: Area[];
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {inputList.mealClassificationBlock.map(({ name, type, label }) => (
        <Controller
          key={name}
          control={control}
          name={name}
          render={({ field }) => {
            if (type === 'checkbox') {
              return (
                <div>
                  <label htmlFor={name} className="label">
                    {label}
                  </label>

                  <input
                    type="checkbox"
                    id={name}
                    className="input"
                    checked={field.value as boolean}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </div>
              );
            }

            return (
              <div>
                <label htmlFor={name} className="label">
                  {label}
                </label>

                <select
                  value={field.value as string}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary input"
                >
                  {name === 'category' ? (
                    <>
                      <option value=""></option>

                      {categories.map(({ strCategory }) => (
                        <option key={strCategory} value={strCategory}>
                          {strCategory}
                        </option>
                      ))}
                    </>
                  ) : (
                    <>
                      <option value=""></option>

                      {areas.map(({ strArea }) => (
                        <option key={strArea} value={strArea}>
                          {strArea}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            );
          }}
        />
      ))}
    </div>
  );
};

export default MealClassificationInputsBlock;
