import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/core/contexts/auth';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { ProtectedRouteProps } from './types';

/**
 * @component ProtectedRoute
 * @summary Wrapper component that protects routes requiring authentication.
 * @domain core
 * @type utility-component
 * @category navigation
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
