import { Counter } from '@/domain/counter/components/Counter';

/**
 * @page DashboardPage
 * @summary The main page for authenticated users, containing the counter feature.
 * @domain counter
 * @type dashboard-page
 * @category functional
 */
export const DashboardPage = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Welcome to the counter application.</p>

      <div className="mt-8">
        <Counter />
      </div>
    </div>
  );
};
