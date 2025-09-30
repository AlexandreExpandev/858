import { Link } from 'react-router-dom';
import { Button } from '@/core/components/Button';

/**
 * @page HomePage
 * @summary The public landing page of the application.
 * @type public-page
 * @category marketing
 */
export const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Sistema para Contar de 1 a 10
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-500">
          A simple yet powerful application to demonstrate modern frontend architecture with React.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button asChild size="lg">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
