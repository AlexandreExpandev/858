export type CounterSpeed = 'slow' | 'medium' | 'fast';
export type CounterRunStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface ControlStates {
  startButton: 'enabled' | 'disabled';
  pauseButton: 'enabled' | 'disabled';
  resetButton: 'enabled' | 'disabled';
}

export interface CounterStatus {
  status: CounterRunStatus;
  currentValue: number;
  speed: CounterSpeed;
  controlStates: ControlStates;
  notification?: string;
}
