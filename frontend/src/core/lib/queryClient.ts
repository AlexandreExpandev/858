import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

/**
 * @singleton queryClient
 * @summary Global TanStack Query client configuration.
 * @type query-client
 * @category core-library
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error: any) => {
        if (error.response?.status === 404) return false;
        if (error.response?.status === 401) return false;
        return failureCount < 3;
      },
    },
    mutations: {
      onError: (error: any) => {
        toast.error(error.message || 'An error occurred');
      },
    },
  },
});
