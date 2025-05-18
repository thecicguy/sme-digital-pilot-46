
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ViewToggle } from "@/components/common/ViewToggle";

interface TaskFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterProjectId: string;
  onProjectFilterChange: (value: string) => void;
  projects: any[] | undefined;
  getProjectName: (projectId: string) => string;
  getClientName: (projectId: string) => string;
  view: "grid" | "list" | "kanban";
  onViewChange: (view: string) => void;
}

const TaskFilters = ({
  searchTerm,
  onSearchChange,
  filterProjectId,
  onProjectFilterChange,
  projects,
  getProjectName,
  getClientName,
  view,
  onViewChange
}: TaskFiltersProps) => {
  // Handler for view changes that works with the updated ViewToggle component
  const handleViewChange = (newView: string) => {
    if (newView === "grid" || newView === "list" || newView === "kanban") {
      onViewChange(newView);
    }
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={filterProjectId} onValueChange={onProjectFilterChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Filter by project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Projects</SelectItem>
          {projects?.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {getProjectName(project.id)} - {getClientName(project.id)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ViewToggle view={view} onViewChange={handleViewChange} showKanban={true} />
    </div>
  );
};

export default TaskFilters;
