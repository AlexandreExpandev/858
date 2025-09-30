/**
 * @summary
 * Constants related to the counter functionality
 */
export const CounterConstants = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 10,
  DEFAULT_SPEED: 'medium' as const,
  
  SPEED_VALUES: {
    slow: 2000,    // 2 seconds per number
    medium: 1000,  // 1 second per number
    fast: 500      // 0.5 seconds per number
  },
  
  STATUS: {
    IDLE: 'idle' as const,
    RUNNING: 'running' as const,
    PAUSED: 'paused' as const,
    COMPLETED: 'completed' as const
  }
};
