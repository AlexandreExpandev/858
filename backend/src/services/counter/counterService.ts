import { logger } from '../../utils/logger';
import { AppError } from '../../utils/appError';

// Counter state types
type CounterSpeed = 'slow' | 'medium' | 'fast';
type CounterState = 'idle' | 'counting' | 'paused' | 'completed';

// Counter state interface
interface CounterStatus {
  userId: number;
  currentNumber: number;
  state: CounterState;
  speed: CounterSpeed;
  lastUpdated: Date;
}

// In-memory store for counter states
const counterStates = new Map<number, CounterStatus>();

// Speed values in milliseconds
const speedValues = {
  slow: 2000,    // 2 seconds
  medium: 1000,  // 1 second
  fast: 500      // 0.5 seconds
};

/**
 * @summary
 * Starts the counting sequence from 1 to 10
 */
export async function startCounting(userId: number) {
  try {
    // Initialize or reset counter state
    const counterStatus: CounterStatus = {
      userId,
      currentNumber: 1,
      state: 'counting',
      speed: 'medium', // Default speed
      lastUpdated: new Date()
    };
    
    counterStates.set(userId, counterStatus);
    
    logger.info('Counting started', { userId, counterStatus });
    
    return {
      message: 'Counting started',
      status: counterStatus
    };
  } catch (error) {
    logger.error('Error starting counter', { error, userId });
    throw new AppError('Failed to start counting', 500);
  }
}

/**
 * @summary
 * Pauses the counting sequence at the current number
 */
export async function pauseCounting(userId: number) {
  try {
    const counterStatus = counterStates.get(userId);
    
    if (!counterStatus) {
      throw new AppError('Counter not started', 400);
    }
    
    if (counterStatus.state === 'paused') {
      throw new AppError('Counter already paused', 400);
    }
    
    if (counterStatus.state === 'completed') {
      throw new AppError('Counter already completed', 400);
    }
    
    // Update state to paused
    counterStatus.state = 'paused';
    counterStatus.lastUpdated = new Date();
    counterStates.set(userId, counterStatus);
    
    logger.info('Counting paused', { userId, counterStatus });
    
    return {
      message: 'Counting paused',
      status: counterStatus
    };
  } catch (error) {
    logger.error('Error pausing counter', { error, userId });
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to pause counting', 500);
  }
}

/**
 * @summary
 * Resumes the counting sequence from the paused number
 */
export async function resumeCounting(userId: number) {
  try {
    const counterStatus = counterStates.get(userId);
    
    if (!counterStatus) {
      throw new AppError('Counter not started', 400);
    }
    
    if (counterStatus.state !== 'paused') {
      throw new AppError('Counter is not paused', 400);
    }
    
    // Update state to counting
    counterStatus.state = 'counting';
    counterStatus.lastUpdated = new Date();
    counterStates.set(userId, counterStatus);
    
    logger.info('Counting resumed', { userId, counterStatus });
    
    return {
      message: 'Counting resumed',
      status: counterStatus
    };
  } catch (error) {
    logger.error('Error resuming counter', { error, userId });
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to resume counting', 500);
  }
}

/**
 * @summary
 * Restarts the counting sequence from 1
 */
export async function restartCounting(userId: number) {
  try {
    const counterStatus = counterStates.get(userId);
    
    if (!counterStatus) {
      throw new AppError('Counter not started', 400);
    }
    
    // Reset counter to initial state but keep the speed setting
    const speed = counterStatus.speed;
    
    const newCounterStatus: CounterStatus = {
      userId,
      currentNumber: 1,
      state: 'counting',
      speed,
      lastUpdated: new Date()
    };
    
    counterStates.set(userId, newCounterStatus);
    
    logger.info('Counting restarted', { userId, counterStatus: newCounterStatus });
    
    return {
      message: 'Counting restarted',
      status: newCounterStatus
    };
  } catch (error) {
    logger.error('Error restarting counter', { error, userId });
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to restart counting', 500);
  }
}

/**
 * @summary
 * Updates the counting speed (slow, medium, fast)
 */
export async function updateCountingSpeed(userId: number, speed: CounterSpeed) {
  try {
    const counterStatus = counterStates.get(userId);
    
    if (!counterStatus) {
      throw new AppError('Counter not started', 400);
    }
    
    // Update speed
    counterStatus.speed = speed;
    counterStatus.lastUpdated = new Date();
    counterStates.set(userId, counterStatus);
    
    logger.info('Counting speed updated', { userId, speed, counterStatus });
    
    return {
      message: `Counting speed updated to ${speed}`,
      status: counterStatus
    };
  } catch (error) {
    logger.error('Error updating counter speed', { error, userId, speed });
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to update counting speed', 500);
  }
}

/**
 * @summary
 * Gets the current counter status
 */
export async function getCounterStatus(userId: number) {
  try {
    const counterStatus = counterStates.get(userId);
    
    if (!counterStatus) {
      // Return default state if counter hasn't been started\n      return {\n        userId,\n        currentNumber: 0,\n        state: 'idle',\n        speed: 'medium',\n        lastUpdated: new Date()\n      };\n    }\n    \n    return counterStatus;\n  } catch (error) {\n    logger.error('Error getting counter status', { error, userId });\n    throw new AppError('Failed to get counter status', 500);\n  }\n}\n