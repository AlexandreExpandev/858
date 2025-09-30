import { CounterStatus, CounterSpeed } from './counterTypes';
import { logger } from '../../utils/logger';

// In-memory storage for counter state (in a real app, this would be in a database)
const counters = new Map<number, {
  currentValue: number;
  status: CounterStatus;
  speed: CounterSpeed;
}>();

/**
 * @summary
 * Starts the counter for a user
 */
export async function startCounter(userId: number) {
  // Check if counter already exists and is running
  const existingCounter = counters.get(userId);
  if (existingCounter && existingCounter.status === 'running') {
    throw new Error('CounterAlreadyRunning');
  }

  // Validate system state is idle
  if (existingCounter && existingCounter.status !== 'stopped' && existingCounter.status !== 'idle') {
    throw new Error('CounterNotIdle');
  }

  // Create or reset counter
  const counter = {
    currentValue: 1,
    status: 'running' as CounterStatus,
    speed: existingCounter?.speed || 'medium' as CounterSpeed
  };
  
  counters.set(userId, counter);
  
  // Log the start event
  logger.info('Counter started', {
    userId,
    timestamp: new Date().toISOString(),
    event: 'start_counting'
  });

  return {
    currentValue: counter.currentValue,
    status: counter.status,
    speed: counter.speed,
    controls: {
      start: { enabled: false },
      pause: { enabled: true },
      reset: { enabled: true }
    },
    notification: 'Contagem iniciada!'
  };
}

/**
 * @summary
 * Pauses the counter for a user
 */
export async function pauseCounter(userId: number) {
  const counter = counters.get(userId);
  
  if (!counter || counter.status !== 'running') {
    throw new Error('CounterNotRunning');
  }
  
  counter.status = 'paused';
  counters.set(userId, counter);
  
  return {
    currentValue: counter.currentValue,
    status: counter.status,
    speed: counter.speed
  };
}

/**
 * @summary
 * Resumes the counter for a user from its paused state
 */
export async function resumeCounter(userId: number) {
  const counter = counters.get(userId);
  
  if (!counter || counter.status !== 'paused') {
    throw new Error('CounterNotPaused');
  }
  
  counter.status = 'running';
  counters.set(userId, counter);
  
  return {
    currentValue: counter.currentValue,
    status: counter.status,
    speed: counter.speed
  };
}

/**
 * @summary
 * Restarts the counter for a user back to 1
 */
export async function restartCounter(userId: number) {
  const counter = counters.get(userId);
  
  if (!counter) {
    // If no counter exists, create one
    return startCounter(userId);
  }
  
  counter.currentValue = 1;
  counter.status = 'running';
  counters.set(userId, counter);
  
  return {
    currentValue: counter.currentValue,
    status: counter.status,
    speed: counter.speed,
    controls: {
      start: { enabled: false },
      pause: { enabled: true },
      reset: { enabled: true }
    }
  };
}

/**
 * @summary
 * Sets the speed of the counter for a user
 */
export async function setCounterSpeed(userId: number, speed: CounterSpeed) {
  let counter = counters.get(userId);
  
  if (!counter) {
    // Create a new counter if one doesn't exist\n    counter = {\n      currentValue: 1,\n      status: 'stopped' as CounterStatus,\n      speed: speed\n    };\n  } else {\n    counter.speed = speed;\n  }\n  \n  counters.set(userId, counter);\n  \n  return {\n    currentValue: counter.currentValue,\n    status: counter.status,\n    speed: counter.speed\n  };\n}\n\n/**\n * @summary\n * Gets the current status of a user's counter
 */
export async function getCounterStatus(userId: number) {
  const counter = counters.get(userId);
  
  if (!counter) {
    // Return default state if no counter exists
    return {
      currentValue: 0,
      status: 'idle' as CounterStatus,
      speed: 'medium' as CounterSpeed,
      controls: {
        start: { enabled: true },
        pause: { enabled: false },
        reset: { enabled: false }
      }
    };
  }
  
  // Determine control states based on counter status
  const controls = {
    start: { enabled: counter.status === 'idle' || counter.status === 'stopped' },
    pause: { enabled: counter.status === 'running' },
    reset: { enabled: counter.status !== 'idle' }
  };
  
  return {
    currentValue: counter.currentValue,
    status: counter.status,
    speed: counter.speed,
    controls
  };
}

/**
 * @summary
 * Increments the counter value (would be called by a timer in a real implementation)
 */
export async function incrementCounter(userId: number) {
  const counter = counters.get(userId);
  
  if (!counter || counter.status !== 'running') {
    return null;
  }
  
  if (counter.currentValue < 10) {
    counter.currentValue += 1;
    counters.set(userId, counter);
  } else {
    // Counter reached 10, stop it
    counter.status = 'stopped';
    counters.set(userId, counter);
  }
  
  return {
    currentValue: counter.currentValue,
    status: counter.status,
    speed: counter.speed,
    controls: {
      start: { enabled: counter.status === 'stopped' },
      pause: { enabled: counter.status === 'running' },
      reset: { enabled: counter.status !== 'idle' }
    }
  };
}
