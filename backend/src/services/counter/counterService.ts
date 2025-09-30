import { CounterStatus, CounterSpeed } from './counterTypes';
import { createLogger } from '../../utils/logger/loggerUtils';

const logger = createLogger('counterService');

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
    
    // Initialize counter for user if it doesn't exist
    if (!CounterService.counters.has(userId)) {
      CounterService.counters.set(userId, {
        status: 'idle',
        currentValue: 1,
        speed: 'medium'
      });
    }
  }
  
  /**
   * Start the counter from 1
   */
  async start(): Promise<CounterStatus> {
    const counter = this.getUserCounter();
    
    // Validate current state
    if (counter.status !== 'idle' && counter.status !== 'completed') {
      logger.info(`Counter start rejected for user ${this.userId}: counter not in idle state`);
      throw new Error('counterNotIdle');
    }
    
    // Update counter state
    counter.status = 'running';
    counter.currentValue = 1;
    
    // Log the start event
    logger.info(`Counter started for user ${this.userId}`);
    
    return this.getStatus();
  }
  
  /**
   * Pause the counter at current position
   */
  async pause(): Promise<CounterStatus | null> {
    const counter = this.getUserCounter();
    
    if (counter.status !== 'running') {
      return null;
    }
    
    counter.status = 'paused';
    
    return this.getStatus();
  }
  
  /**
   * Resume the counter from paused position
   */
  async resume(): Promise<CounterStatus | null> {
    const counter = this.getUserCounter();
    
    if (counter.status !== 'paused') {
      return null;
    }
    
    counter.status = 'running';
    
    return this.getStatus();
  }
  
  /**
   * Restart the counter back to 1
   */
  async restart(): Promise<CounterStatus> {
    const counter = this.getUserCounter();
    
    counter.status = 'running';
    counter.currentValue = 1;
    
    return this.getStatus();
  }
  
  /**
   * Set the speed of the counter
   */
  async setSpeed(speed: CounterSpeed): Promise<CounterStatus> {
    const counter = this.getUserCounter();
    
    counter.speed = speed;
    
    return this.getStatus();
  }
  
  /**
   * Get the current status of the counter
   */
  async getStatus(): Promise<CounterStatus> {
    const counter = this.getUserCounter();
    
    return {
      status: counter.status,
      currentValue: counter.currentValue,
      speed: counter.speed,
      maxValue: 10
    };
  }
  
  /**
   * Get the user's counter from storage
   */
  private getUserCounter() {
    return CounterService.counters.get(this.userId)!;
  }
}