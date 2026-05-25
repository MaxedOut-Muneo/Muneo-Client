export const ROUTES = {
  login: '/login',
  users: '/users',
  userDetail: (id: number | string) => `/users/${id}`,
} as const;
