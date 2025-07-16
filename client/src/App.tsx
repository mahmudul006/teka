import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { AppRoutes } from './routes/routes';

const App = (): React.ReactElement => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router >
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;