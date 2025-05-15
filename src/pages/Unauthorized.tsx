
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <ShieldAlert className="h-16 w-16 text-destructive" />
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="max-w-md text-muted-foreground">
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <Button asChild>
          <Link to="/clients">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
