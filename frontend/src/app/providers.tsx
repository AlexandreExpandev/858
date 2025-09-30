import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '@/core/lib/queryClient';

/**
 * @component AppProviders
 * @summary Wraps the entire application with necessary context providers.
 * @type layout-component
 * @category core
 */
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
};
