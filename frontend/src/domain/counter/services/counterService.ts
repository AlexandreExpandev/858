import { api } from '@/core/lib/api';
import type { CounterStatus, CounterSpeed } from '../types';

/**
 * @service counterService
 * @summary Provides methods for counter-related API calls.
 * @domain counter
 * @type api-service
 */
export const counterService = {
  start: (): Promise<CounterStatus> => api.post('/internal/counter/start'),
  pause: (): Promise<CounterStatus> => api.post('/internal/counter/pause'),
  resume: (): Promise<CounterStatus> => api.post('/internal/counter/resume'),
  restart: (): Promise<CounterStatus> => api.post('/internal/counter/restart'),
  setSpeed: (speed: CounterSpeed): Promise<{ speed: CounterSpeed }> =>
    api.put('/internal/counter/speed', { speed }),
  getStatus: (): Promise<CounterStatus> => api.get('/internal/counter/status'),
};
