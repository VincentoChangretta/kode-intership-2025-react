import { createRoot } from 'react-dom/client';
import App from 'app/App';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import 'app/styles/index.scss';
import 'shared/config/i18n/i18n';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <ErrorBoundary>
      <StoreProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StoreProvider>
    </ErrorBoundary>
  </HashRouter>,
);
