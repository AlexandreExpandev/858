/**
 * @summary
 * Type definitions for the counter service
 */

// Counter status types
export type CounterStatus = 'idle' | 'running' | 'paused' | 'stopped';

// Counter speed settings
export type CounterSpeed = 'slow' | 'medium' | 'fast';

// Counter state interface
export interface CounterState {
  currentValue: number;
  status: CounterStatus;
  speed: CounterSpeed;
  controls?: {
    start: { enabled: boolean };
    pause: { enabled: boolean };
    reset: { enabled: boolean };
  };
  notification?: string;
}
