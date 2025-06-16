import { Controller, UseFormReturn } from 'react-hook-form';
import { CreateRecipeInput } from '../../../types/recipe';
import { inputList } from '../inputList';
import { validation } from '../validation';

const MIN_ROWS_QUANTITY = 3;

const MainInfoInputsBlock = ({
  form: {
    control,
    setValue,
    watch,
    formState: { errors },
  },
}: {
  form: UseFormReturn<CreateRecipeInput, any, CreateRecipeInput>;
}) => {
  const ingredientsData = watch('ingredients');

  const addIngredient = () => {
    setValue('ingredients', [...ingredientsData, '']);
  };

  const removeIngredient = (index: number) => {
    setValue(
      'ingredients',
      ingredientsData.filter((_, i) => i !== index)
    );
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredientsData];
    newIngredients[index] = value;
    setValue('ingredients', newIngredients);
  };
  return (
    <>
      {inputList.mainInfoBlock.map(({ name, label, type, rows }) => {
        const rules = validation[name] ?? undefined;
        const errorMessage = errors[name] ? errors[name]?.message : '';

        return (
          <Controller
            key={name}
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
              if (type === 'textarea') {
                return (
                  <div>
                    <label htmlFor={name} className="label">
                      {label}
                    </label>

                    <textarea
                      id={name}
                      className="input"
                      rows={rows ?? MIN_ROWS_QUANTITY}
                      value={field.value as string}
                      onChange={(e) => field.onChange(e.target.value)}
                    />

                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                  </div>
                );
              }

              if (name === 'ingredients') {
                return (
                  <div>
                    <label className="label">{label}</label>

                    {ingredientsData.map((ingredient, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type={type}
                          value={ingredient}
                          onChange={(e) => updateIngredient(index, e.target.value)}
                          className="input"
                        />

                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="btn btn-secondary"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={addIngredient} className="btn btn-secondary">
                      Add Ingredient
                    </button>

                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                  </div>
                );
              }

              return (
                <div>
                  <label htmlFor={name} className="label">
                    {label}
                  </label>

                  <input
                    type={type}
                    id={name}
                    className="input"
                    value={field.value as string}
                    onChange={(e) => field.onChange(e.target.value)}
                  />

                  {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                </div>
              );
            }}
          />
        );
      })}
    </>
  );
};

export default MainInfoInputsBlock;
