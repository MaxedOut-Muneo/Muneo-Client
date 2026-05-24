import { createBrowserRouter, Navigate } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { Layout } from '@/layout/Layout';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { UserDetailPage } from '@/pages/UserDetailPage/UserDetailPage';
import { UsersListPage } from '@/pages/UsersListPage/UsersListPage';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: ROUTES.login,
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to={ROUTES.users} replace /> },
          { path: ROUTES.users, element: <UsersListPage /> },
          { path: ROUTES.userDetail(':userId'), element: <UserDetailPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.users} replace />,
  },
]);
