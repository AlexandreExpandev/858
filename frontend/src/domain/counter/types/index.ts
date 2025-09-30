export type CounterState = 'idle' | 'running' | 'paused' | 'finished';

export type CounterSpeed = 'slow' | 'medium' | 'fast';

export interface CounterStatus {
  currentNumber: number;
  state: CounterState;
  speed: CounterSpeed;
}
