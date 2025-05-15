
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProject, fetchClients } from "@/lib/api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  clientId?: string;
}

const projectTypes = [
  "consultation",
  "implementation",
  "training",
  "support",
  "other",
];

const CreateProjectDialog = ({ open, onClose, clientId: initialClientId }: CreateProjectDialogProps) => {
  const queryClient = useQueryClient();
  const [clientId, setClientId] = useState(initialClientId || "");
  const [type, setType] = useState<"consultation" | "implementation" | "training" | "support" | "other">("consultation");
  const [daysAllocated, setDaysAllocated] = useState("5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    enabled: open,
  });

  // Update clientId when initialClientId changes
  useEffect(() => {
    if (initialClientId) {
      setClientId(initialClientId);
    }
  }, [initialClientId]);

  const projectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (clientId) {
        queryClient.invalidateQueries({ queryKey: ["clientProjects", clientId] });
      }
      resetForm();
      onClose();
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!clientId) {
      newErrors.clientId = "Client is required";
    }
    
    if (!daysAllocated) {
      newErrors.daysAllocated = "Days allocated is required";
    } else if (isNaN(Number(daysAllocated)) || Number(daysAllocated) <= 0) {
      newErrors.daysAllocated = "Days allocated must be a positive number";
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
      await projectMutation.mutateAsync({
        type,
        daysAllocated: Number(daysAllocated),
        clientId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (!initialClientId) setClientId("");
    setType("consultation");
    setDaysAllocated("5");
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
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Set up a new project for your client.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!initialClientId && (
              <div className="grid gap-2">
                <Label htmlFor="client" className="required">
                  Client
                </Label>
                <Select value={clientId} onValueChange={setClientId}>
                  <SelectTrigger id="client" className={errors.clientId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients?.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.businessName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.clientId && (
                  <p className="text-xs text-destructive">{errors.clientId}</p>
                )}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="type">Project Type</Label>
              <Select value={type} onValueChange={(value: any) => setType(value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="daysAllocated" className="required">
                Days Allocated
              </Label>
              <Input
                id="daysAllocated"
                type="number"
                min="1"
                value={daysAllocated}
                onChange={(e) => setDaysAllocated(e.target.value)}
                placeholder="Number of days"
                className={errors.daysAllocated ? "border-destructive" : ""}
              />
              {errors.daysAllocated && (
                <p className="text-xs text-destructive">{errors.daysAllocated}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
