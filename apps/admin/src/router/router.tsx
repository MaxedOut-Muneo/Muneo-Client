import { createBrowserRouter, Navigate } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { Layout } from '@/layout/Layout';
import { GlobalError } from '@/pages/GlobalError/GlobalError';
import { Login } from '@/pages/Login/Login';
import { NotFound } from '@/pages/NotFound/NotFound';
import { UserDetail } from '@/pages/UserDetail/UserDetail';
import { UsersList } from '@/pages/UsersList/UsersList';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    errorElement: <GlobalError />,
    children: [
      {
        path: ROUTES.login,
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              { index: true, element: <Navigate to={ROUTES.users} replace /> },
              { path: ROUTES.users, element: <UsersList /> },
              { path: ROUTES.userDetail(':userId'), element: <UserDetail /> },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
