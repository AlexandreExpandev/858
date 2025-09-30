import { Link } from 'react-router-dom';

/**
 * @page NotFoundPage
 * @summary A 404 Not Found page for non-existent routes.
 * @domain core
 * @type page-component
 * @category error-handling
 */
export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  );
};
