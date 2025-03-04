import { Header } from 'widgets/Header';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './routers/AppRouter';

function App() {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme}`}>
      <Header />
      <main>
        <div className="container">
          <AppRouter />
        </div>
      </main>
    </div>
  );
}

export default App;
