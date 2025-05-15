
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, fetchProjects, fetchContacts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  projectId?: string;
}

const CreateTaskDialog = ({ open, onClose, projectId: initialProjectId }: CreateTaskDialogProps) => {
  const queryClient = useQueryClient();
  const [projectId, setProjectId] = useState(initialProjectId || "");
  const [description, setDescription] = useState("");
  const [references, setReferences] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    enabled: open && !initialProjectId,
  });

  const { data: contacts, refetch: refetchContacts } = useQuery({
    queryKey: ["contacts", projectId],
    queryFn: () => fetchContacts(),
    enabled: false,
  });

  // Update projectId when initialProjectId changes
  useEffect(() => {
    if (initialProjectId) {
      setProjectId(initialProjectId);
    }
  }, [initialProjectId]);

  // When projectId changes, fetch contacts for that client
  useEffect(() => {
    if (projectId) {
      refetchContacts();
    }
  }, [projectId, refetchContacts]);

  const taskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: ["projectTasks", projectId] });
      }
      resetForm();
      onClose();
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!projectId) {
      newErrors.projectId = "Project is required";
    }
    
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!assigneeId) {
      newErrors.assigneeId = "Assignee is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await taskMutation.mutateAsync({
        description,
        references: references || undefined,
        assigneeId,
        projectId,
        dueDate,
        status: "doing",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (!initialProjectId) setProjectId("");
    setDescription("");
    setReferences("");
    setAssigneeId("");
    setDueDate(undefined);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Assign a task to a client contact.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!initialProjectId && (
              <div className="grid gap-2">
                <Label htmlFor="project" className="required">
                  Project
                </Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger id="project" className={errors.projectId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects?.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.type} (ID: {project.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.projectId && (
                  <p className="text-xs text-destructive">{errors.projectId}</p>
                )}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="description" className="required">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed task description"
                className={errors.description ? "border-destructive" : ""}
                rows={3}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="references">References</Label>
              <Input
                id="references"
                value={references}
                onChange={(e) => setReferences(e.target.value)}
                placeholder="Optional references or instructions"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignee" className="required">
                Assignee
              </Label>
              <Select
                value={assigneeId}
                onValueChange={setAssigneeId}
                disabled={!projectId || !contacts?.length}
              >
                <SelectTrigger id="assignee" className={errors.assigneeId ? "border-destructive" : ""}>
                  <SelectValue placeholder={!projectId ? "Select a project first" : "Select assignee"} />
                </SelectTrigger>
                <SelectContent>
                  {contacts?.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name} ({contact.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.assigneeId && (
                <p className="text-xs text-destructive">{errors.assigneeId}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                    id="dueDate"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
