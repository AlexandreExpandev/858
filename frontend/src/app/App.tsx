import { AppRouter } from './router';
import { AppProviders } from './providers';

/**
 * @component App
 * @summary Root application component that composes providers and the router.
 * @type ui-component
 * @category layout
 */
function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
