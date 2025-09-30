import { logger } from '../../utils/logger';

/**
 * @summary
 * Service for managing the counting process from 1 to 10
 */

// Types
type CounterSpeed = 'slow' | 'medium' | 'fast';
type CounterStatus = 'idle' | 'counting' | 'paused' | 'completed';

interface CounterState {
  currentNumber: number;
  status: CounterStatus;
  speed: CounterSpeed;
  lastUpdated: Date;
}

// In-memory store for counter states (in a real app, this would be in a database)
const counterStates = new Map<number, CounterState>();

// Speed values in milliseconds
const speedValues = {
  slow: 2000,    // 2 seconds
  medium: 1000,  // 1 second
  fast: 500      // 0.5 seconds
};

/**
 * Starts the counting process from 1 to 10
 */
export async function startCounting(userId: number): Promise<CounterState> {
  const counterState: CounterState = {
    currentNumber: 1,
    status: 'counting',
    speed: 'medium', // Default speed
    lastUpdated: new Date()
  };
  
  counterStates.set(userId, counterState);
  logger.info('Counting started', { userId, counterState });
  
  return counterState;
}

/**
 * Pauses the ongoing counting process
 */
export async function pauseCounting(userId: number): Promise<CounterState> {
  const state = counterStates.get(userId);
  
  if (!state) {
    throw new Error('No active counting process found');
  }
  
  if (state.status !== 'counting') {
    throw new Error(`Cannot pause counting in ${state.status} state`);
  }
  
  const updatedState: CounterState = {
    ...state,
    status: 'paused',
    lastUpdated: new Date()
  };
  
  counterStates.set(userId, updatedState);
  logger.info('Counting paused', { userId, counterState: updatedState });
  
  return updatedState;
}

/**
 * Resumes the counting process from where it was paused
 */
export async function resumeCounting(userId: number): Promise<CounterState> {
  const state = counterStates.get(userId);
  
  if (!state) {
    throw new Error('No active counting process found');
  }
  
  if (state.status !== 'paused') {
    throw new Error(`Cannot resume counting in ${state.status} state`);
  }
  
  const updatedState: CounterState = {
    ...state,
    status: 'counting',
    lastUpdated: new Date()
  };
  
  counterStates.set(userId, updatedState);
  logger.info('Counting resumed', { userId, counterState: updatedState });
  
  return updatedState;
}

/**
 * Restarts the counting process from 1
 */
export async function restartCounting(userId: number): Promise<CounterState> {
  const state = counterStates.get(userId);
  
  if (!state) {
    throw new Error('No active counting process found');
  }
  
  const updatedState: CounterState = {
    ...state,
    currentNumber: 1,
    status: 'counting',
    lastUpdated: new Date()
  };
  
  counterStates.set(userId, updatedState);
  logger.info('Counting restarted', { userId, counterState: updatedState });
  
  return updatedState;
}

/**
 * Sets the speed of the counting process
 */
export async function setCountingSpeed(userId: number, speed: CounterSpeed): Promise<CounterState> {
  const state = counterStates.get(userId);
  
  if (!state) {
    throw new Error('No active counting process found');
  }
  
  const updatedState: CounterState = {
    ...state,
    speed,
    lastUpdated: new Date()
  };
  
  counterStates.set(userId, updatedState);
  logger.info('Counting speed updated', { userId, speed, counterState: updatedState });
  
  return updatedState;
}

/**
 * Gets the current status of the counter
 */
export async function getCounterStatus(userId: number): Promise<CounterState> {
  const state = counterStates.get(userId);
  
  if (!state) {
    // Return default state if no counting process exists
    return {
      currentNumber: 0,
      status: 'idle',
      speed: 'medium',
      lastUpdated: new Date()
    };
  }
  
  return state;
}

/**
 * Simulates the counting process (for demonstration purposes)
 * In a real application, this would be implemented with WebSockets or SSE
 */
export async function simulateCountingProcess(userId: number): Promise<void> {
  const state = counterStates.get(userId);
  
  if (!state || state.status !== 'counting') {
    return;
  }
  
  if (state.currentNumber >= 10) {
    // Counting completed
    const updatedState: CounterState = {
      ...state,
      status: 'completed',
      lastUpdated: new Date()
    };
    
    counterStates.set(userId, updatedState);
    logger.info('Counting completed', { userId, counterState: updatedState });
    return;
  }
  
  // Increment the counter
  setTimeout(() => {
    const currentState = counterStates.get(userId);
    
    if (currentState && currentState.status === 'counting') {
      const updatedState: CounterState = {
        ...currentState,
        currentNumber: currentState.currentNumber + 1,
        lastUpdated: new Date()
      };
      
      counterStates.set(userId, updatedState);
      logger.info('Counter incremented', { userId, counterState: updatedState });
      
      // Continue counting
      simulateCountingProcess(userId);
    }
  }, speedValues[state.speed]);
}
