export type CounterSpeed = 'slow' | 'medium' | 'fast';
export type CounterRunStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface CounterStatus {
  status: CounterRunStatus;
  currentValue: number;
  speed: CounterSpeed;
}
