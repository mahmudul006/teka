import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
  fallback?: ReactNode;
}

const ProtectedRoute = ({
  children,
  isAuthenticated,
  redirectTo = '/login',
  fallback,
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Store the attempted location for redirect after login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (fallback && !children) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
