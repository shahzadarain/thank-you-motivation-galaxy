
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

// Simple check if user is authenticated by looking for a flag in sessionStorage
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
