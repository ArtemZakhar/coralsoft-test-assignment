export const validation = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters long',
    },
    maxLength: {
      value: 100,
    },
  },
  description: {
    required: 'Description is required',
    minLength: {
      value: 10,
      message: 'Description must be at least 10 characters long',
    },
  },
  ingredients: {
    required: 'Ingredients are required',
    validate: (value: string[]) => {
      if (value.length === 1 && !value[0].trim().length) {
        return 'At least one ingredient is required';
      }

      return true;
    },
  },
  instructions: {
    required: 'Instructions are required',
    minLength: {
      value: 20,
      message: 'Instructions must be at least 20 characters long',
    },
  },
  image: {
    required: 'Image is required',
    pattern: {
      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      message: 'Image must be a valid URL',
    },
  },
};
