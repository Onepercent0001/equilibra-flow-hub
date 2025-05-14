
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Accounts from "./pages/Accounts";
import Goals from "./pages/Goals";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Rotas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DataProvider>
                <Outlet />
              </DataProvider>}>
                <Route path="/dashboard" element={<Index />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
