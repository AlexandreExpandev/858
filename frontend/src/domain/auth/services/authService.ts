import { api } from '@/core/lib/api';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

/**
 * @service authService
 * @summary Provides methods for authentication-related API calls.
 * @domain auth
 * @type api-service
 */
export const authService = {
  /**
   * @method login
   * @summary Authenticates a user and returns user data and a token.
   */
  login: (credentials: LoginCredentials): Promise<AuthResponse> => {
    return api.post('/external/auth/login', credentials);
  },

  /**
   * @method register
   * @summary Registers a new user and returns user data and a token.
   */
  register: (credentials: RegisterCredentials): Promise<AuthResponse> => {
    return api.post('/external/auth/register', credentials);
  },
};
