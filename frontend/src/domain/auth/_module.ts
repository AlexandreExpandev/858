/**
 * @module auth
 * @summary Manages user authentication, registration, and session state.
 * @domain security
 * @dependencies zustand, axios, react-router-dom
 * @version 1.0.0
 */

// Public Hooks
export * from './hooks/useAuth';

// Public Services
export * from './services/authService';

// Public Stores
export * from './stores/authStore';

// Public Types
export * from './types';

export const moduleMetadata = {
  name: 'auth',
  domain: 'security',
  version: '1.0.0',
  publicHooks: ['useAuth'],
  publicServices: ['authService'],
  publicStores: ['useAuthStore'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['zustand', 'axios'],
    domains: [],
  },
} as const;
