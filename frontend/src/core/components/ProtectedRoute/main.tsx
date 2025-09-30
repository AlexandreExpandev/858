import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/domain/auth/hooks/useAuth';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

/**
 * @component ProtectedRoute
 * @summary A wrapper component that guards routes requiring authentication.
 * @type utility-component
 * @category navigation
 */
export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
