import { logger } from '../../utils/logger';

/**
 * @summary
 * Speed settings for the counter in milliseconds
 */
const SPEED_SETTINGS = {
  slow: 2000,    // 2 seconds per number
  medium: 1000,  // 1 second per number
  fast: 500      // 0.5 seconds per number
};

/**
 * @summary
 * Counter status types
 */
export type CounterStatus = 'idle' | 'counting' | 'paused' | 'completed';

/**
 * @summary
 * Counter speed types
 */
export type CounterSpeed = 'slow' | 'medium' | 'fast';

/**
 * @summary
 * Counter state interface
 */
export interface CounterState {
  currentNumber: number;
  status: CounterStatus;
  speed: CounterSpeed;
  intervalId?: NodeJS.Timeout;
}

/**
 * @summary
 * Service to manage the counting functionality
 */
export class CounterService {
  private userCounters: Map<string, CounterState> = new Map();
  
  /**
   * Get or initialize a user's counter state\n   */\n  private getUserCounter(userId: string): CounterState {\n    if (!this.userCounters.has(userId)) {\n      this.userCounters.set(userId, {\n        currentNumber: 1,\n        status: 'idle',\n        speed: 'medium'\n      });\n    }\n    \n    return this.userCounters.get(userId)!;\n  }\n  \n  /**\n   * Start the counting sequence\n   */\n  public startCounting(userId: string): CounterState {\n    const counter = this.getUserCounter(userId);\n    \n    // Clear any existing interval\n    if (counter.intervalId) {\n      clearInterval(counter.intervalId);\n    }\n    \n    // Reset counter to initial state\n    counter.currentNumber = 1;\n    counter.status = 'counting';\n    \n    // Start the counting interval\n    this.startCountingInterval(userId);\n    \n    logger.info(`User ${userId} started counting`);\n    return { ...counter };\n  }\n  \n  /**\n   * Pause the counting sequence\n   */\n  public pauseCounting(userId: string): CounterState {\n    const counter = this.getUserCounter(userId);\n    \n    if (counter.status !== 'counting') {\n      throw new Error('Counter is not currently counting');\n    }\n    \n    // Clear the interval\n    if (counter.intervalId) {\n      clearInterval(counter.intervalId);\n      counter.intervalId = undefined;\n    }\n    \n    counter.status = 'paused';\n    logger.info(`User ${userId} paused counting at ${counter.currentNumber}`);\n    \n    return { ...counter };\n  }\n  \n  /**\n   * Resume the counting sequence\n   */\n  public resumeCounting(userId: string): CounterState {\n    const counter = this.getUserCounter(userId);\n    \n    if (counter.status !== 'paused') {\n      throw new Error('Counter is not currently paused');\n    }\n    \n    counter.status = 'counting';\n    this.startCountingInterval(userId);\n    \n    logger.info(`User ${userId} resumed counting from ${counter.currentNumber}`);\n    return { ...counter };\n  }\n  \n  /**\n   * Restart the counting sequence\n   */\n  public restartCounting(userId: string): CounterState {\n    const counter = this.getUserCounter(userId);\n    \n    // Clear any existing interval\n    if (counter.intervalId) {\n      clearInterval(counter.intervalId);\n    }\n    \n    // Reset counter to initial state\n    counter.currentNumber = 1;\n    counter.status = 'counting';\n    \n    // Start the counting interval\n    this.startCountingInterval(userId);\n    \n    logger.info(`User ${userId} restarted counting`);\n    return { ...counter };\n  }\n  \n  /**\n   * Set the counting speed\n   */\n  public setCountingSpeed(userId: string, speed: CounterSpeed): CounterState {\n    const counter = this.getUserCounter(userId);\n    counter.speed = speed;\n    \n    // If currently counting, restart the interval with the new speed\n    if (counter.status === 'counting' && counter.intervalId) {\n      clearInterval(counter.intervalId);\n      this.startCountingInterval(userId);\n    }\n    \n    logger.info(`User ${userId} set counting speed to ${speed}`);\n    return { ...counter };\n  }\n  \n  /**\n   * Get the current counter status\n   */\n  public getCounterStatus(userId: string): CounterState {\n    return { ...this.getUserCounter(userId) };\n  }\n  \n  /**\n   * Start the counting interval\n   */\n  private startCountingInterval(userId: string): void {\n    const counter = this.getUserCounter(userId);\n    const speedMs = SPEED_SETTINGS[counter.speed];\n    \n    counter.intervalId = setInterval(() => {\n      // Get the latest counter state\n      const currentCounter = this.getUserCounter(userId);\n      \n      // If we've reached 10, complete the counting
      if (currentCounter.currentNumber >= 10) {
        clearInterval(currentCounter.intervalId);
        currentCounter.status = 'completed';
        currentCounter.intervalId = undefined;
        logger.info(`User ${userId} completed counting sequence`);
        return;
      }
      
      // Increment the counter
      currentCounter.currentNumber += 1;
      logger.debug(`User ${userId} counting: ${currentCounter.currentNumber}`);
    }, speedMs);
  }
}
