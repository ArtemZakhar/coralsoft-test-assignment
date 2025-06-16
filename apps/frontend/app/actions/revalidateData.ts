'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateData(tags: string[]) {
  for (const tag of tags) {
    revalidateTag(tag);
  }
}
