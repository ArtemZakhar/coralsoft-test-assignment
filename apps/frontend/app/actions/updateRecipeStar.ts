'use server';

import { toggleStar } from '../../lib/api';

export const updateRecipeStar = async (id: string) => {
  return await toggleStar(id);
};
