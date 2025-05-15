
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to clients page on load
    navigate("/clients", { replace: true });
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">CRM for SMEs</h1>
        <p className="mt-2">Redirecting to dashboard...</p>
        <div className="mt-4 h-2 w-40 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full animate-pulse bg-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
