/**
 * @summary
 * Type definitions for counter service
 */

/**
 * Counter speed options
 */
export type CounterSpeed = 'slow' | 'medium' | 'fast';

/**
 * Counter status information
 */
export interface CounterStatus {
  status: 'idle' | 'running' | 'paused' | 'completed';
  currentValue: number;
  speed: CounterSpeed;
  maxValue: number;
}
