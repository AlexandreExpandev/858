import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/domain/auth/hooks/useAuth';
import { Button } from '@/core/components/Button';

/**
 * @component DashboardLayout
 * @summary Provides the main layout for authenticated sections of the app, including a header.
 * @type layout-component
 * @category navigation
 */
export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="font-bold text-lg">Counter App</div>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user?.name || 'User'}</span>
            <Button onClick={handleLogout} variant="secondary" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
