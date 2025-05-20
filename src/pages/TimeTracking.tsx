
import { useState } from "react";
import { format } from "date-fns";
import { Timer, Plus, Play, Briefcase, Users, List, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimeTrackingProvider } from "@/contexts/TimeTrackingContext";
import TimeTrackingHeader from "@/components/timetracking/TimeTrackingHeader";
import TimeTrackingContent from "@/components/timetracking/TimeTrackingContent";
import CreateTimeEntryDialog from "@/components/timetracking/CreateTimeEntryDialog";
import TimerWidget from "@/components/timetracking/TimerWidget";

const TimeTracking = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <TimeTrackingProvider>
      <div className="space-y-6">
        <TimeTrackingHeader onCreateTimeEntry={() => setIsCreateDialogOpen(true)} />
        
        <TimerWidget />
        
        <TimeTrackingContent />

        <CreateTimeEntryDialog
          open={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
        />
      </div>
    </TimeTrackingProvider>
  );
};

export default TimeTracking;
