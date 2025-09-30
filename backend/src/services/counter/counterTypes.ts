/**
 * @summary
 * Type definitions for the counter service
 */

// Counter status types
export type CounterStatus = 'running' | 'paused' | 'stopped';

// Counter speed settings
export type CounterSpeed = 'slow' | 'medium' | 'fast';

// Counter state interface
export interface CounterState {
  currentValue: number;
  status: CounterStatus;
  speed: CounterSpeed;
}
