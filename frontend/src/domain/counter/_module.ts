/**
 * @module counter
 * @summary Manages the state and interactions for the counting feature.
 * @domain functional
 * @dependencies axios, @tanstack/react-query
 * @version 1.0.0
 */

// Domain public exports - Services
export * from './services/counterService';

// Domain public exports - Hooks
export * from './hooks/useCounter';

// Domain public exports - Types
export * from './types';

// Module metadata
export const moduleMetadata = {
  name: 'counter',
  domain: 'functional',
  version: '1.0.0',
  publicServices: ['counterService'],
  publicHooks: ['useCounter'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['axios', '@tanstack/react-query'],
  },
} as const;
