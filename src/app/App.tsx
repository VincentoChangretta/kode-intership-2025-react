import { Suspense } from 'react';
import { AppRouter } from './routers/AppRouter';

function App() {
  return (
    <div className="app">
      <Suspense fallback="">
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;
