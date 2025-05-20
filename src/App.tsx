import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import BidsPage from "./pages/BidsPage";
import WalletPage from "./pages/WalletPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import RideDetailPage from "./pages/RideDetailPage";
import OngoingRidesPage from "./pages/OngoingRidesPage";
import TotalRidesPage from "./pages/TotalRidesPage";
import TotalBidsPage from "./pages/TotalBidsPage";
import RatingsPage from "./pages/RatingsPage";
import VerificationPendingPage from "./pages/VerificationPendingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/splash" replace />} />
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/rides/:rideId" element={<RideDetailPage />} />
          <Route path="/ongoing-rides" element={<OngoingRidesPage />} />
          <Route path="/total-rides" element={<TotalRidesPage />} />
          <Route path="/total-bids" element={<TotalBidsPage />} />
          <Route path="/ratings" element={<RatingsPage />} />
          <Route path="/bids" element={<BidsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/verification-pending" element={<VerificationPendingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
