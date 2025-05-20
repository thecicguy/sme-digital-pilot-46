import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import AppLayout from './components/AppLayout';
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import ClientDetail from "@/pages/ClientDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Tasks from "@/pages/Tasks";
import Calendar from "@/pages/Calendar";
import Booking from "@/pages/Booking";
import Reports from "@/pages/Reports";
import Documents from "@/pages/Documents";
import TimeTracking from "@/pages/TimeTracking";
import Settings from "@/pages/Settings";
import EmailTemplates from "@/pages/EmailTemplates";
import TemplateStore from "@/pages/TemplateStore";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Index />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "clients",
        element: (
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        )
      },
      {
        path: "clients/:clientId",
        element: (
          <ProtectedRoute>
            <ClientDetail />
          </ProtectedRoute>
        )
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        )
      },
      {
        path: "projects/:projectId",
        element: (
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        )
      },
      {
        path: "tasks",
        element: (
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        )
      },
      {
        path: "calendar",
        element: (
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        )
      },
      {
        path: "booking",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        )
      },
      {
        path: "reports",
        element: (
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        )
      },
      {
        path: "documents",
        element: (
          <ProtectedRoute>
            <Documents />
          </ProtectedRoute>
        )
      },
      {
        path: "timetracking",
        element: (
          <ProtectedRoute>
            <TimeTracking />
          </ProtectedRoute>
        )
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        )
      },
      {
        path: "email-templates",
        element: (
          <ProtectedRoute>
            <EmailTemplates />
          </ProtectedRoute>
        )
      },
      {
        path: "template-store",
        element: (
          <ProtectedRoute>
            <TemplateStore />
          </ProtectedRoute>
        )
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "unauthorized",
        element: <Unauthorized />
      }
    ]
  }
]);

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-react-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
