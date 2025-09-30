import api from '@/core/lib/api';
import type { ApiResponse } from '@/core/types/api';
import type { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

/**
 * @service authService
 * @summary Handles API requests for authentication.
 * @domain auth
 * @type api-service
 */
export const authService = {
  /**
   * @summary Logs in a user.
   * @param {LoginCredentials} credentials - The user's email and password.\n   * @returns {Promise<AuthResponse>} The auth response with token and user data.\n   */\n  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {\n    const response = await api.post<ApiResponse<AuthResponse>>('/external/security/login', credentials);\n    return response.data.data;\n  },\n\n  /**\n   * @summary Registers a new user.\n   * @param {RegisterCredentials} credentials - The new user's name, email, and password.
   * @returns {Promise<AuthResponse>} The auth response with token and user data.
   */
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/external/security/register', credentials);
    return response.data.data;
  },
};
