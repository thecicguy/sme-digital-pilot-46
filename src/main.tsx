import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

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

createRoot(document.getElementById("root")!).render(<App />);
