import { useCounter } from '@/domain/counter';
import { Button } from '@/core/components/Button';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

/**
 * @page HomePage
 * @summary The main dashboard page where the counter functionality is displayed.
 * @domain counter
 * @type page-component
 * @category dashboard
 */
export const HomePage = () => {
  const {
    status,
    isLoading,
    start,
    pause,
    resume,
    restart,
    setSpeed,
  } = useCounter();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderControls = () => {
    if (status?.status === 'running') {
      return <Button onClick={() => pause()}>Pause</Button>;
    }
    if (status?.status === 'paused') {
      return <Button onClick={() => resume()}>Resume</Button>;
    }
    return <Button onClick={() => start()}>Start</Button>;
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Counter</h1>
      <div className="my-8">
        <p className="text-9xl font-mono font-bold">
          {status?.currentValue ?? 0}
        </p>
        <p className="text-xl text-gray-500 capitalize">{status?.status ?? 'idle'}</p>
      </div>
      <div className="space-x-2 mb-4">
        {renderControls()}
        <Button onClick={() => restart()} variant="outline" disabled={status?.status === 'idle'}>
          Restart
        </Button>
      </div>
      <div className="space-x-2">
        <Button onClick={() => setSpeed('slow')} variant={status?.speed === 'slow' ? 'default' : 'ghost'}>Slow</Button>
        <Button onClick={() => setSpeed('medium')} variant={status?.speed === 'medium' ? 'default' : 'ghost'}>Medium</Button>
        <Button onClick={() => setSpeed('fast')} variant={status?.speed === 'fast' ? 'default' : 'ghost'}>Fast</Button>
      </div>
    </div>
  );
};
