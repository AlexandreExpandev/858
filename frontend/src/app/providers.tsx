import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/core/contexts/auth';
import { queryClient } from '@/core/lib/queryClient';

/**
 * @component AppProviders
 * @summary A component that wraps the entire application with necessary context providers.
 * @type utility-component
 * @category configuration
 */
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster position="bottom-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
};
