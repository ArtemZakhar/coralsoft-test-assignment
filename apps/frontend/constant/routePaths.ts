export const routePaths = {
  root: '/',
  recipes: {
    root: '/recipes',
    starred: '/recipes/starred',
    byId: (id: string) => `/recipes/${id}`,
    edit: (id: string) => `/recipes/${id}/edit`,
  },
};
