
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "service_provider" | "client_contact";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    } else if (!loading && user && requiredRole && user.role !== requiredRole) {
      navigate("/unauthorized", { replace: true });
    }
  }, [user, loading, navigate, requiredRole]);

  // Show loading if still checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-crm-blue border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, don't render children
  // The useEffect will redirect to login
  if (!user) {
    return null;
  }

  // If role is required and user doesn't have it, don't render children
  // The useEffect will redirect to unauthorized page
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  // User is authenticated and has the required role
  return <>{children}</>;
};

export default ProtectedRoute;
