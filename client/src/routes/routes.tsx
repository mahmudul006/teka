import { Navigate, type RouteObject, useRoutes } from 'react-router';
import ProtectedRoute from '../components/Router/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import Dashboard from '../modules/Home/Dashboard';
import { AuthContainer } from '../modules/Login/AuthContainer';

// Loading component
const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
    }}
  >
    <div
      style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #007bff',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
      }}
    />
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
); 
export const AppRoutes = () => {
  const { isAuthenticated, logout, user, isLoading } = useAuth();

  const routes: RouteObject[] = [
    {
      path: '/',
      element: isAuthenticated ? (
        <Navigate to='/dashboard' replace />
      ) : (
        <Navigate to='/login' replace />
      ),
    },
    {
      path: '/login',
      element: <AuthContainer />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Dashboard onLogout={logout} user={user || undefined} />
        </ProtectedRoute>
      ),
    },
    {
      path: '*',
      element: <Navigate to='/' replace />,
    },
  ];

  const routeElements = useRoutes(routes);

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return routeElements;
};
