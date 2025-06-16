import { Controller, UseFormReturn } from 'react-hook-form';
import { CreateRecipeInput } from '../../../types/recipe';
import { inputList } from '../inputList';

const MealStatsInputsBlock = ({
  form: { control },
}: {
  form: UseFormReturn<CreateRecipeInput, any, CreateRecipeInput>;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {inputList.mealStatsBlock.map(({ name, type, label }) => (
        <Controller
          key={name}
          control={control}
          name={name}
          render={({ field }) => {
            return (
              <div>
                <label htmlFor={name} className="label">
                  {label}
                </label>

                <input
                  type={type}
                  id={name}
                  className="input"
                  value={String(field.value)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d.]/g, '').replace(/^0+(\d)/, '$1');
                    field.onChange(Number(value));
                  }}
                />
              </div>
            );
          }}
        />
      ))}
    </div>
  );
};

export default MealStatsInputsBlock;
