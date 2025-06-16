export const apiPaths = {
  recipes: {
    root: '/recipes',
    starred: '/recipes/starred',
    random: '/recipes/random',
    byId: (id: string) => `/recipes/${id}`,
    toggleStar: (id: string) => `/recipes/${id}/toggle-star`,
  },
  categories: {
    root: '/categories',
  },
  areas: {
    root: '/areas',
  },
};
