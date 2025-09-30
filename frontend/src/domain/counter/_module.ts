/**
 * @module counter
 * @summary Manages the state and interactions for the counting feature.
 * @domain functional
 * @dependencies axios, @tanstack/react-query
 * @version 1.0.0
 */

// Public Components
export * from './components/Counter';

// Public Hooks
export * from './hooks/useCounter';

// Public Services
export * from './services/counterService';

// Public Types
export * from './types';

export const moduleMetadata = {
  name: 'counter',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['Counter'],
  publicHooks: ['useCounter'],
  publicServices: ['counterService'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['axios', '@tanstack/react-query'],
    domains: ['auth'],
  },
} as const;
