/**
 * @summary
 * Counter status interface
 */
export interface CounterStatus {
  currentNumber: number;
  isRunning: boolean;
  isPaused: boolean;
  speed: 'slow' | 'medium' | 'fast';
  sequence: number[];
}

/**
 * @summary
 * Service to manage counter operations
 */
export class CounterService {
  private static instance: CounterService;
  private userCounters: Map<string, CounterStatus>;
  
  private constructor() {
    this.userCounters = new Map<string, CounterStatus>();
  }
  
  /**
   * @summary
   * Gets the singleton instance of the counter service
   */
  public static getInstance(): CounterService {
    if (!CounterService.instance) {
      CounterService.instance = new CounterService();
    }
    return CounterService.instance;
  }
  
  /**
   * @summary
   * Gets or initializes a counter for a user
   */
  private getOrCreateCounter(userId: string): CounterStatus {
    if (!this.userCounters.has(userId)) {
      this.userCounters.set(userId, {
        currentNumber: 0,
        isRunning: false,
        isPaused: false,
        speed: 'medium',
        sequence: []
      });
    }
    return this.userCounters.get(userId)!;
  }
  
  /**
   * @summary
   * Starts the counting sequence for a user
   */
  public startCounting(userId: string): CounterStatus {
    const counter = this.getOrCreateCounter(userId);
    
    if (counter.isRunning && !counter.isPaused) {
      throw new Error('Counter is already running');
    }
    
    // Reset and start the counter
    counter.currentNumber = 1;
    counter.isRunning = true;
    counter.isPaused = false;
    counter.sequence = [1];
    
    return { ...counter };
  }
  
  /**
   * @summary
   * Pauses the counting sequence for a user
   */
  public pauseCounting(userId: string): CounterStatus {
    const counter = this.getOrCreateCounter(userId);
    
    if (!counter.isRunning) {
      throw new Error('Counter is not running');
    }
    
    if (counter.isPaused) {
      throw new Error('Counter is already paused');
    }
    
    counter.isPaused = true;
    
    return { ...counter };
  }
  
  /**
   * @summary
   * Resumes the counting sequence for a user
   */
  public resumeCounting(userId: string): CounterStatus {
    const counter = this.getOrCreateCounter(userId);
    
    if (!counter.isRunning) {
      throw new Error('Counter is not running');
    }
    
    if (!counter.isPaused) {
      throw new Error('Counter is not paused');
    }
    
    counter.isPaused = false;
    
    // If we haven't reached 10 yet, increment the counter\n    if (counter.currentNumber < 10) {\n      counter.currentNumber++;\n      counter.sequence.push(counter.currentNumber);\n    }\n    \n    return { ...counter };\n  }\n  \n  /**\n   * @summary\n   * Restarts the counting sequence for a user\n   */\n  public restartCounting(userId: string): CounterStatus {\n    const counter = this.getOrCreateCounter(userId);\n    \n    counter.currentNumber = 1;\n    counter.isRunning = true;\n    counter.isPaused = false;\n    counter.sequence = [1];\n    \n    return { ...counter };\n  }\n  \n  /**\n   * @summary\n   * Sets the counting speed for a user\n   */\n  public setCountingSpeed(userId: string, speed: 'slow' | 'medium' | 'fast'): CounterStatus {\n    const counter = this.getOrCreateCounter(userId);\n    counter.speed = speed;\n    \n    return { ...counter };\n  }\n  \n  /**\n   * @summary\n   * Gets the current counter status for a user\n   */\n  public getCounterStatus(userId: string): CounterStatus {\n    return { ...this.getOrCreateCounter(userId) };\n  }\n  \n  /**\n   * @summary\n   * Simulates advancing the counter for a user\n   * In a real application, this would be called by a timer or event\n   */\n  public advanceCounter(userId: string): CounterStatus | null {\n    const counter = this.getOrCreateCounter(userId);\n    \n    if (!counter.isRunning || counter.isPaused || counter.currentNumber >= 10) {\n      return null;\n    }\n    \n    counter.currentNumber++;\n    counter.sequence.push(counter.currentNumber);\n    \n    // If we've reached 10, stop the counter
    if (counter.currentNumber >= 10) {
      counter.isRunning = false;
    }
    
    return { ...counter };
  }
}
