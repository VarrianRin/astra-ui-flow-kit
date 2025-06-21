
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import StudentLogin from "./pages/StudentLogin";
import Dashboard from "./pages/Dashboard";
import LessonPlan from "./pages/LessonPlan";
import TaskMatch from "./pages/TaskMatch";
import HomeworkCheck from "./pages/HomeworkCheck";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/auth/signup" element={<Register />} />
          <Route path="/students/login" element={<StudentLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lesson-plan" element={<LessonPlan />} />
          <Route path="/task-match" element={<TaskMatch />} />
          <Route path="/homework-check" element={<HomeworkCheck />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
