
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTimeTracking } from "@/contexts/TimeTrackingContext";

interface TimeTrackingHeaderProps {
  onCreateTimeEntry: () => void;
}

const TimeTrackingHeader: React.FC<TimeTrackingHeaderProps> = ({ onCreateTimeEntry }) => {
  const { activeTimeEntry, startTimer } = useTimeTracking();

  const handleQuickStart = () => {
    startTimer({
      description: "Untitled time entry",
    });
  };

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Time Tracking</h1>
        <p className="text-muted-foreground">Track time against clients, projects, and tasks</p>
      </div>
      <div className="flex gap-2">
        {!activeTimeEntry && (
          <Button variant="outline" onClick={handleQuickStart}>
            <Play className="mr-2 h-4 w-4" />
            Quick Start
          </Button>
        )}
        <Button onClick={onCreateTimeEntry}>
          <Plus className="mr-2 h-4 w-4" />
          Log Time
        </Button>
      </div>
    </div>
  );
};

export default TimeTrackingHeader;
