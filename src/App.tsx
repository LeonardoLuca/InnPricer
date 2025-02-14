import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from '@/pages/LandingPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;