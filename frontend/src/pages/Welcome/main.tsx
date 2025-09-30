import { Link } from 'react-router-dom';

/**
 * @page WelcomePage
 * @summary The public landing page for the application.
 * @domain core
 * @type page-component
 * @category public
 */
export const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold">Welcome to the Counter App</h1>
      <p className="text-xl mt-4 text-gray-600">
        A simple application to count from 1 to 10.
      </p>
      <div className="mt-8 space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 text-lg text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50"
        >
          Register
        </Link>
      </div>
    </div>
  );
};
