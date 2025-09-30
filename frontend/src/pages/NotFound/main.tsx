import { Link } from 'react-router-dom';
import { Button } from '@/core/components/Button';

/**
 * @page NotFoundPage
 * @summary Displayed when a user navigates to a non-existent route.
 * @type error-page
 * @category navigation
 */
export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
      <Button asChild className="mt-6">
        <Link to="/">Go to Homepage</Link>
      </Button>
    </div>
  );
};
