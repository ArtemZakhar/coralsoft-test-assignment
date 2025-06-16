import { SearchParamsType } from '../types/searchParams';

export const getUpdatedSearchParams = (
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParamsType
): string => {
  const newParams = new URLSearchParams(currentParams);

  for (const [key, value] of Object.entries(paramsToUpdate)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);

      for (const part of value) {
        newParams.append(key, part);
      }
    } else {
      newParams.set(key, value);
    }
  }

  return newParams.toString();
};

export const searchParamsToString = (searchParams: SearchParamsType) => {
  const newParams = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (!value) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const part of value) {
        newParams.append(key, part);
      }
    } else {
      newParams.set(key, value);
    }
  }
  return newParams.toString();
};
