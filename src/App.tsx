import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./pages/SignIn";
import ProfileCreation from "./pages/ProfileCreation";
import Dashboard from "./pages/Dashboard";
import HealthTracker from "./pages/HealthTracker";
import MedicalTracker from "./pages/MedicalTracker";
import ImmunityTracker from "./pages/ImmunityTracker";
import ViewProfile from "./pages/ViewProfile";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/profile-creation" element={<ProfileCreation />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/health-tracker" element={<HealthTracker />} />
              <Route path="/medical-tracker" element={<MedicalTracker />} />
              <Route path="/immunity-tracker" element={<ImmunityTracker />} />
              <Route path="/view-profile" element={<ViewProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
