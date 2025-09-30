import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { counterService } from '../../services/counterService';
import type { UseCounterReturn } from './types';
import type { CounterStatus } from '../../types';

const COUNTER_STATUS_QUERY_KEY = ['counterStatus'];

/**
 * @hook useCounter
 * @summary Manages the state and actions for the counter feature using TanStack Query.
 * @domain counter
 * @type domain-hook
 * @category data
 */
export const useCounter = (): UseCounterReturn => {
  const queryClient = useQueryClient();

  const statusQuery = useQuery<CounterStatus, Error>({
    queryKey: COUNTER_STATUS_QUERY_KEY,
    queryFn: counterService.getStatus,
  });

  const startMutation = useMutation<CounterStatus, Error, void>({
    mutationFn: counterService.start,
    onSuccess: (data) => {
      // DF-012, BR-008: Notify user on success
      toast.success('Contagem iniciada!');
      // DF-004, DF-010: Update the UI with the new state from the server
      queryClient.setQueryData(COUNTER_STATUS_QUERY_KEY, data);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to start the counter.';
      toast.error(errorMessage);
    },
  });

  return {
    statusQuery,
    startMutation,
  };
};
