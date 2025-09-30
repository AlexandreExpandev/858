/**
 * @summary
 * Constants related to the counter functionality
 */
export const CounterConstants = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 10,
  
  SPEEDS: {
    SLOW: 'slow',
    MEDIUM: 'medium',
    FAST: 'fast'
  },
  
  SPEED_VALUES: {
    slow: 2000,    // 2 seconds
    medium: 1000,  // 1 second
    fast: 500      // 0.5 seconds
  },
  
  STATES: {
    IDLE: 'idle',
    COUNTING: 'counting',
    PAUSED: 'paused',
    COMPLETED: 'completed'
  }
};
