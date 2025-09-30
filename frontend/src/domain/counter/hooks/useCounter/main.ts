import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { counterService } from '../../services/counterService';
import type { CounterSpeed } from '../../types';

const COUNTER_QUERY_KEY = ['counterStatus'];

/**
 * @hook useCounter
 * @summary Manages the state and actions for the counter feature using TanStack Query.
 * @domain counter
 * @type domain-hook
 * @category data
 */
export const useCounter = () => {
  const queryClient = useQueryClient();

  const { data: status, isLoading, error } = useQuery({
    queryKey: COUNTER_QUERY_KEY,
    queryFn: counterService.getStatus,
    refetchInterval: (query) => {
        // Only refetch if the counter is running
        return query.state.data?.status === 'running' ? 1000 : false;
    },
  });

  const invalidateCounterQuery = () => {
    queryClient.invalidateQueries({ queryKey: COUNTER_QUERY_KEY });
  };

  const startMutation = useMutation({
    mutationFn: counterService.start,
    onSuccess: (data) => {
      if (data.notification) {
        toast.success(data.notification);
      }
      invalidateCounterQuery();
    },
  });

  const pauseMutation = useMutation({
    mutationFn: counterService.pause,
    onSuccess: invalidateCounterQuery,
  });

  const resumeMutation = useMutation({
    mutationFn: counterService.resume,
    onSuccess: invalidateCounterQuery,
  });

  const restartMutation = useMutation({
    mutationFn: counterService.restart,
    onSuccess: invalidateCounterQuery,
  });

  const setSpeedMutation = useMutation({
    mutationFn: (speed: CounterSpeed) => counterService.setSpeed(speed),
    onSuccess: invalidateCounterQuery,
  });

  return {
    status,
    isLoading,
    error,
    start: startMutation.mutate,
    isStarting: startMutation.isPending,
    pause: pauseMutation.mutate,
    isPausing: pauseMutation.isPending,
    resume: resumeMutation.mutate,
    isResuming: resumeMutation.isPending,
    restart: restartMutation.mutate,
    isRestarting: restartMutation.isPending,
    setSpeed: setSpeedMutation.mutate,
    isSettingSpeed: setSpeedMutation.isPending,
  };
};
