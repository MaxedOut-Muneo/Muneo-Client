import { Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

export const ProtectedRoute = () => {
  const admin = useAuthStore((s) => s.admin);
  const location = useLocation();

  if (!admin) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
};
