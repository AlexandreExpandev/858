import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { RootLayout } from '@/pages/layouts/RootLayout';
import { AuthLayout } from '@/pages/layouts/AuthLayout';
import { DashboardLayout } from '@/pages/layouts/DashboardLayout';

import { ErrorBoundary } from '@/core/components/ErrorBoundary';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ProtectedRoute } from '@/core/components/ProtectedRoute';

// Lazy load pages for code-splitting
const WelcomePage = lazy(() => import('@/pages/Welcome'));
const LoginPage = lazy(() => import('@/pages/Login'));
const RegisterPage = lazy(() => import('@/pages/Register'));
const HomePage = lazy(() => import('@/pages/Home'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/**
 * @router AppRouter
 * @summary Main application routing configuration with lazy loading and hierarchical layouts.
 * @type router-configuration
 * @category navigation
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <WelcomePage />
          </Suspense>
        ),
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <LoginPage />
              </Suspense>
            ),
          },
          {
            path: 'register',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <RegisterPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'home',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <HomePage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

/**
 * @component AppRouter
 * @summary Router provider component that wraps the entire application with routing capabilities.
 */
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
