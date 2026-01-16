import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { Layout } from "@/components/Layout";
import { Login } from "@/pages/Login";
import { Feed } from "@/pages/Feed";
import { Discover } from "@/pages/Discover";
import { Highlights } from "@/pages/Highlights";
import { Chats } from "@/pages/Chats";
import { Profile } from "@/pages/Profile";
import { TestRunner } from "@/pages/TestRunner";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useApp();

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chats/:chatId" element={<Chats />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/test/:type" element={<TestRunner />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
