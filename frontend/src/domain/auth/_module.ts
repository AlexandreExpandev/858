/**
 * @module auth
 * @summary Handles user authentication, including login and registration.
 * @domain security
 * @dependencies axios, zod
 * @version 1.0.0
 */

// Domain public exports - Services
export * from './services/authService';

// Domain public exports - Types
export * from './types';

// Module metadata
export const moduleMetadata = {
  name: 'auth',
  domain: 'security',
  version: '1.0.0',
  publicServices: ['authService'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['axios', 'zod'],
  },
} as const;
