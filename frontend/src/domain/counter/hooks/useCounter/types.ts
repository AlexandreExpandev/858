import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { CounterStatus } from '../../types';

export interface UseCounterReturn {
  statusQuery: UseQueryResult<CounterStatus, Error>;
  startMutation: UseMutationResult<CounterStatus, Error, void, unknown>;
  // Placeholders for other mutations to be added in subsequent features
  // pauseMutation: UseMutationResult<CounterStatus, Error, void, unknown>;
  // resumeMutation: UseMutationResult<CounterStatus, Error, void, unknown>;
  // restartMutation: UseMutationResult<CounterStatus, Error, void, unknown>;
}
