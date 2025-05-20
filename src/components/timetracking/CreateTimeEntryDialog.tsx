
import { useState } from "react";
import { useTimeTracking } from "@/contexts/TimeTrackingContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CreateTimeEntryDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateTimeEntryDialog: React.FC<CreateTimeEntryDialogProps> = ({
  open,
  onClose,
}) => {
  const { clients, projects, tasks, addTimeEntry } = useTimeTracking();
  
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState<string | undefined>(undefined);
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date>(new Date());
  const [hours, setHours] = useState("1");
  const [minutes, setMinutes] = useState("0");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const filteredProjects = projectId
    ? projects
    : clientId
    ? projects.filter((p) => p.clientId === clientId)
    : projects;
    
  const filteredTasks = projectId
    ? tasks.filter((t) => t.projectId === projectId)
    : tasks;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (isNaN(Number(hours)) || isNaN(Number(minutes))) {
      newErrors.duration = "Duration must be a number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const duration = Number(hours) * 60 + Number(minutes);
    
    await addTimeEntry({
      description,
      duration,
      startTime: date,
      clientId,
      projectId,
      taskId,
    });
    
    handleClose();
  };

  const handleClose = () => {
    setDescription("");
    setClientId(undefined);
    setProjectId(undefined);
    setTaskId(undefined);
    setDate(new Date());
    setHours("1");
    setMinutes("0");
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Log Time Entry</DialogTitle>
            <DialogDescription>
              Record time spent on a client, project, or task
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description" className="required">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What did you work on?"
                className={errors.description ? "border-destructive" : ""}
                rows={2}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="client">Client</Label>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select a client (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.businessName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <Select 
                value={projectId} 
                onValueChange={(value) => {
                  setProjectId(value);
                  // Reset task if the project changes
                  setTaskId(undefined);
                }}
                disabled={filteredProjects.length === 0}
              >
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select a project (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {filteredProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="task">Task</Label>
              <Select 
                value={taskId} 
                onValueChange={setTaskId}
                disabled={!projectId || filteredTasks.length === 0}
              >
                <SelectTrigger id="task">
                  <SelectValue placeholder={
                    !projectId 
                      ? "Select a project first" 
                      : "Select a task (optional)"
                  } />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {filteredTasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal"
                    )}
                    id="date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => setDate(date || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="duration" className="required">
                Duration
              </Label>
              <div className="flex items-center gap-2">
                <div className="w-1/4">
                  <Input
                    id="hours"
                    type="number"
                    min="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className={errors.duration ? "border-destructive" : ""}
                    aria-label="Hours"
                  />
                </div>
                <span>hours</span>
                <div className="w-1/4">
                  <Input
                    id="minutes"
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className={errors.duration ? "border-destructive" : ""}
                    aria-label="Minutes"
                  />
                </div>
                <span>minutes</span>
              </div>
              {errors.duration && (
                <p className="text-xs text-destructive">{errors.duration}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save Time Entry</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTimeEntryDialog;
