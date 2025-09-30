import { Button } from '@/core/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/Card';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { useCounter } from '../../hooks/useCounter';

/**
 * @component Counter
 * @summary The main UI component for the counter feature.
 * @domain counter
 * @type domain-component
 * @category functional
 */
export const Counter = () => {
  const { statusQuery, startMutation } = useCounter();

  const { data: status, isLoading, isError, error } = statusQuery;

  const handleStart = () => {
    startMutation.mutate();
  };

  if (isLoading) {
    return (
      <Card className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-red-400 bg-red-50 p-4 text-red-700">
        <p>Error loading counter: {error.message}</p>
      </Card>
    );
  }

  // FC-001: The start button is disabled if the state is not 'idle' or a mutation is in progress.
  const isStartDisabled = status?.state !== 'idle' || startMutation.isPending;
  
  // BR-007: Other buttons are enabled based on state. For now, they are placeholders.
  const isPauseResumeDisabled = status?.state !== 'running' && status?.state !== 'paused';
  const isRestartDisabled = status?.state === 'idle';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Counter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-8 py-10">
        <div className="text-8xl font-bold text-blue-600">
          {status?.currentNumber ?? 0}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={handleStart}
            disabled={isStartDisabled}
            className="w-32"
          >
            {startMutation.isPending ? 'Starting...' : 'Start'}
          </Button>
          <Button
            variant="secondary"
            disabled={isPauseResumeDisabled} // To be implemented in a future feature
            className="w-32"
          >
            Pause/Resume
          </Button>
          <Button
            variant="outline"
            disabled={isRestartDisabled} // To be implemented in a future feature
            className="w-32"
          >
            Restart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
