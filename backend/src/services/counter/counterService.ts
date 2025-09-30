import { CounterStatus, CounterSpeed } from './counterTypes';

/**
 * @summary
 * Service for managing counter operations
 */
export class CounterService {
  private userId: number;
  
  // In-memory storage for demo purposes
  // In a real app, this would be stored in a database
  private static counters: Map<number, {
    status: 'idle' | 'running' | 'paused' | 'completed';
    currentValue: number;
    speed: CounterSpeed;
  }> = new Map();
  
  constructor(userId: number) {
    this.userId = userId;
    
    // Initialize counter for user if it doesn't exist\n    if (!CounterService.counters.has(userId)) {\n      CounterService.counters.set(userId, {\n        status: 'idle',\n        currentValue: 1,\n        speed: 'medium'\n      });\n    }\n  }\n  \n  /**\n   * Start the counter from 1\n   */\n  async start(): Promise<CounterStatus> {\n    const counter = this.getUserCounter();\n    \n    counter.status = 'running';\n    counter.currentValue = 1;\n    \n    return this.getStatus();\n  }\n  \n  /**\n   * Pause the counter at current position\n   */\n  async pause(): Promise<CounterStatus | null> {\n    const counter = this.getUserCounter();\n    \n    if (counter.status !== 'running') {\n      return null;\n    }\n    \n    counter.status = 'paused';\n    \n    return this.getStatus();\n  }\n  \n  /**\n   * Resume the counter from paused position\n   */\n  async resume(): Promise<CounterStatus | null> {\n    const counter = this.getUserCounter();\n    \n    if (counter.status !== 'paused') {\n      return null;\n    }\n    \n    counter.status = 'running';\n    \n    return this.getStatus();\n  }\n  \n  /**\n   * Restart the counter back to 1\n   */\n  async restart(): Promise<CounterStatus> {\n    const counter = this.getUserCounter();\n    \n    counter.status = 'running';\n    counter.currentValue = 1;\n    \n    return this.getStatus();\n  }\n  \n  /**\n   * Set the speed of the counter\n   */\n  async setSpeed(speed: CounterSpeed): Promise<CounterStatus> {\n    const counter = this.getUserCounter();\n    \n    counter.speed = speed;\n    \n    return this.getStatus();\n  }\n  \n  /**\n   * Get the current status of the counter\n   */\n  async getStatus(): Promise<CounterStatus> {\n    const counter = this.getUserCounter();\n    \n    return {\n      status: counter.status,\n      currentValue: counter.currentValue,\n      speed: counter.speed,\n      maxValue: 10\n    };\n  }\n  \n  /**\n   * Get the user's counter from storage
   */
  private getUserCounter() {
    return CounterService.counters.get(this.userId)!;
  }
}
