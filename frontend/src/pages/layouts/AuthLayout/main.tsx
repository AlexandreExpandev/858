import { Outlet } from 'react-router-dom';

/**
 * @component AuthLayout
 * @summary Layout for authentication pages like login and register.
 * @domain core
 * @type layout-component
 * @category layout
 */
export const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Outlet />
    </main>
  );
};
