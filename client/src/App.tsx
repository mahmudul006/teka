import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { AppRoutes } from './routes/routes';

function AppRouter() {
  const routes = AppRoutes();
  const routing = useRoutes(routes);
  return routing;
}

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
