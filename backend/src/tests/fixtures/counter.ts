/**
 * @summary
 * Test fixtures for counter data
 */

import { CounterState } from '../../services/counter/counterService';

export const testCounterStates: Record<number, CounterState> = {
  1: {
    currentNumber: 3,
    status: 'running',
    speed: 'medium',
    lastUpdated: new Date()
  },
  2: {
    currentNumber: 5,
    status: 'paused',
    speed: 'slow',
    lastUpdated: new Date()
  },
  3: {
    currentNumber: 10,
    status: 'completed',
    speed: 'fast',
    lastUpdated: new Date()
  },
  4: {
    currentNumber: 0,
    status: 'idle',
    speed: 'medium',
    lastUpdated: new Date()
  }
};
