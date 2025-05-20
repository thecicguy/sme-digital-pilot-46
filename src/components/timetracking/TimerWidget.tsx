
import { useTimeTracking } from "@/contexts/TimeTrackingContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Timer, X } from "lucide-react";

const TimerWidget: React.FC = () => {
  const { activeTimeEntry, elapsedTime, stopTimer, startTimer } = useTimeTracking();
  
  if (!activeTimeEntry) {
    return null;
  }
  
  // Format time
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Timer className="h-5 w-5 mr-2 text-primary" />
          <div>
            <p className="font-medium">{activeTimeEntry.description || "Untitled"}</p>
            <p className="text-sm text-muted-foreground">
              {activeTimeEntry.clientId ? "Client: " + activeTimeEntry.clientId : ""}
              {activeTimeEntry.projectId ? " • Project: " + activeTimeEntry.projectId : ""}
              {activeTimeEntry.taskId ? " • Task: " + activeTimeEntry.taskId : ""}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xl font-mono font-bold">{formatTime(elapsedTime)}</span>
          <Button variant="outline" size="sm" onClick={stopTimer}>
            <Pause className="h-4 w-4 mr-2" />
            Stop
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimerWidget;
