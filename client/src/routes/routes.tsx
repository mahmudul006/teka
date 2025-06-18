import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/Router/ProtectedRoute';
import Login from '../modules/Login/Login';
import Dashboard from '../modules/Home/Dashboard';
import { useAuth } from '../hooks/useAuth';

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
  const { isAuthenticated, login, logout, user, isLoading } = useAuth();

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return <LoadingSpinner />;
  }

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
      element: <Login isAuthenticated={isAuthenticated} onLogin={login} />,
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

  return routes;
};
