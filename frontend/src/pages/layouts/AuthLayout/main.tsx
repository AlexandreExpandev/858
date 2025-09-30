import { Outlet } from 'react-router-dom';

/**
 * @component AuthLayout
 * @summary Provides a centered layout for authentication pages like login and register.
 * @type layout-component
 * @category navigation
 */
export const AuthLayout = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
      <Outlet />
    </main>
  );
};
