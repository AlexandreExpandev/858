import api from '@/core/lib/api';
import type { ApiResponse } from '@/core/types/api';
import type { CounterStatus, CounterSpeed } from '../types';

/**
 * @service counterService
 * @summary Handles API requests for the counter feature.
 * @domain counter
 * @type api-service
 */
export const counterService = {
  getStatus: async (): Promise<CounterStatus> => {
    const response = await api.get<ApiResponse<CounterStatus>>('/internal/counter/status');
    return response.data.data;
  },

  start: async (): Promise<CounterStatus> => {
    const response = await api.post<ApiResponse<CounterStatus>>('/internal/counter/start');
    return response.data.data;
  },

  pause: async (): Promise<CounterStatus> => {
    const response = await api.post<ApiResponse<CounterStatus>>('/internal/counter/pause');
    return response.data.data;
  },

  resume: async (): Promise<CounterStatus> => {
    const response = await api.post<ApiResponse<CounterStatus>>('/internal/counter/resume');
    return response.data.data;
  },

  restart: async (): Promise<CounterStatus> => {
    const response = await api.post<ApiResponse<CounterStatus>>('/internal/counter/restart');
    return response.data.data;
  },

  setSpeed: async (speed: CounterSpeed): Promise<CounterStatus> => {
    const response = await api.put<ApiResponse<CounterStatus>>('/internal/counter/speed', { speed });
    return response.data.data;
  },
};
