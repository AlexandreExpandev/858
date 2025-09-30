import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/contexts/auth';
import { Button } from '@/core/components/Button';

/**
 * @component DashboardLayout
 * @summary Layout for authenticated application pages.
 * @domain core
 * @type layout-component
 * @category layout
 */
export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Counter App</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user?.name}</span>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};
