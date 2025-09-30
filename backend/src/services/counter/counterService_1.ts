import { logger } from '../../utils/logger';
import { CounterConstants } from '../../constants/counterConstants';

// Types
export type CounterSpeed = 'slow' | 'medium' | 'fast';

export interface CounterState {
  currentNumber: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
  speed: CounterSpeed;
  lastUpdated: Date;
}

// In-memory store for counter states
const counterStates = new Map<number, CounterState>();

/**
 * @summary
 * Initializes or gets a user's counter state\n */\nfunction getOrInitializeCounter(userId: number): CounterState {\n  if (!counterStates.has(userId)) {\n    counterStates.set(userId, {\n      currentNumber: 0,\n      status: CounterConstants.STATUS.IDLE,\n      speed: CounterConstants.DEFAULT_SPEED,\n      lastUpdated: new Date()\n    });\n  }\n  \n  return counterStates.get(userId)!;\n}\n\n/**\n * @summary\n * Starts the counter sequence from 1 to 10\n */\nexport async function startCounter(userId: number) {\n  try {\n    const counterState = getOrInitializeCounter(userId);\n    \n    // Reset counter if it was completed or start fresh\n    if (counterState.status === CounterConstants.STATUS.COMPLETED || \n        counterState.status === CounterConstants.STATUS.IDLE) {\n      counterState.currentNumber = CounterConstants.MIN_NUMBER;\n    } else {\n      // If paused, resume from current position\n      // If already running, do nothing\n      if (counterState.status === CounterConstants.STATUS.RUNNING) {\n        return {\n          message: 'Counter is already running',\n          currentNumber: counterState.currentNumber,\n          status: counterState.status,\n          speed: counterState.speed\n        };\n      }\n    }\n    \n    counterState.status = CounterConstants.STATUS.RUNNING;\n    counterState.lastUpdated = new Date();\n    \n    logger.info('Counter started', { userId, counterState });\n    \n    return {\n      message: 'Counter started',\n      currentNumber: counterState.currentNumber,\n      status: counterState.status,\n      speed: counterState.speed\n    };\n  } catch (error) {\n    logger.error('Error starting counter', { error, userId });\n    throw error;\n  }\n}\n\n/**\n * @summary\n * Pauses the counter at the current number\n */\nexport async function pauseCounter(userId: number) {\n  try {\n    const counterState = getOrInitializeCounter(userId);\n    \n    if (counterState.status !== CounterConstants.STATUS.RUNNING) {\n      return {\n        message: `Cannot pause: counter is ${counterState.status}`,\n        currentNumber: counterState.currentNumber,\n        status: counterState.status,\n        speed: counterState.speed\n      };\n    }\n    \n    counterState.status = CounterConstants.STATUS.PAUSED;\n    counterState.lastUpdated = new Date();\n    \n    logger.info('Counter paused', { userId, counterState });\n    \n    return {\n      message: 'Counter paused',\n      currentNumber: counterState.currentNumber,\n      status: counterState.status,\n      speed: counterState.speed\n    };\n  } catch (error) {\n    logger.error('Error pausing counter', { error, userId });\n    throw error;\n  }\n}\n\n/**\n * @summary\n * Resumes the counter from the paused position\n */\nexport async function resumeCounter(userId: number) {\n  try {\n    const counterState = getOrInitializeCounter(userId);\n    \n    if (counterState.status !== CounterConstants.STATUS.PAUSED) {\n      return {\n        message: `Cannot resume: counter is ${counterState.status}`,\n        currentNumber: counterState.currentNumber,\n        status: counterState.status,\n        speed: counterState.speed\n      };\n    }\n    \n    counterState.status = CounterConstants.STATUS.RUNNING;\n    counterState.lastUpdated = new Date();\n    \n    logger.info('Counter resumed', { userId, counterState });\n    \n    return {\n      message: 'Counter resumed',\n      currentNumber: counterState.currentNumber,\n      status: counterState.status,\n      speed: counterState.speed\n    };\n  } catch (error) {\n    logger.error('Error resuming counter', { error, userId });\n    throw error;\n  }\n}\n\n/**\n * @summary\n * Restarts the counter back to 1\n */\nexport async function restartCounter(userId: number) {\n  try {\n    const counterState = getOrInitializeCounter(userId);\n    \n    counterState.currentNumber = CounterConstants.MIN_NUMBER;\n    counterState.status = CounterConstants.STATUS.RUNNING;\n    counterState.lastUpdated = new Date();\n    \n    logger.info('Counter restarted', { userId, counterState });\n    \n    return {\n      message: 'Counter restarted',\n      currentNumber: counterState.currentNumber,\n      status: counterState.status,\n      speed: counterState.speed\n    };\n  } catch (error) {\n    logger.error('Error restarting counter', { error, userId });\n    throw error;\n  }\n}\n\n/**\n * @summary\n * Sets the speed of the counter (slow, medium, fast)\n */\nexport async function setCounterSpeed(userId: number, speed: CounterSpeed) {\n  try {\n    const counterState = getOrInitializeCounter(userId);\n    \n    counterState.speed = speed;\n    counterState.lastUpdated = new Date();\n    \n    logger.info('Counter speed updated', { userId, speed, counterState });\n    \n    return {\n      message: `Counter speed set to ${speed}`,\n      currentNumber: counterState.currentNumber,\n      status: counterState.status,\n      speed: counterState.speed,\n      intervalMs: CounterConstants.SPEED_VALUES[speed]\n    };\n  } catch (error) {\n    logger.error('Error setting counter speed', { error, userId, speed });\n    throw error;\n  }\n}\n\n/**\n * @summary\n * Gets the current status of the counter\n */\nexport async function getCounterStatus(userId: number) {\n  try {\n    const counterState = getOrInitializeCounter(userId);\n    \n    // Simulate counter progression if it's running
    if (counterState.status === CounterConstants.STATUS.RUNNING) {
      const elapsedTime = new Date().getTime() - counterState.lastUpdated.getTime();
      const intervalMs = CounterConstants.SPEED_VALUES[counterState.speed];
      const progressedNumbers = Math.floor(elapsedTime / intervalMs);
      
      if (progressedNumbers > 0) {
        // Update the counter based on elapsed time
        const newNumber = counterState.currentNumber + progressedNumbers;
        
        if (newNumber >= CounterConstants.MAX_NUMBER) {
          // Counter completed
          counterState.currentNumber = CounterConstants.MAX_NUMBER;
          counterState.status = CounterConstants.STATUS.COMPLETED;
        } else {
          counterState.currentNumber = newNumber;
        }
        
        counterState.lastUpdated = new Date(counterState.lastUpdated.getTime() + (progressedNumbers * intervalMs));
      }
    }
    
    return {
      currentNumber: counterState.currentNumber,
      status: counterState.status,
      speed: counterState.speed,
      intervalMs: CounterConstants.SPEED_VALUES[counterState.speed],
      lastUpdated: counterState.lastUpdated
    };
  } catch (error) {
    logger.error('Error getting counter status', { error, userId });
    throw error;
  }
}
