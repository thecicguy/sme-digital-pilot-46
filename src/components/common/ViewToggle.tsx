
import { ListIcon, Grid2X2Icon, Kanban } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ViewToggleProps {
  view: "list" | "grid" | "kanban";
  onViewChange: (view: "list" | "grid" | "kanban") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <ToggleGroup type="single" value={view} onValueChange={(value) => {
      if (value === "list" || value === "grid" || value === "kanban") {
        onViewChange(value);
      }
    }}>
      <ToggleGroupItem value="list" aria-label="List view">
        <ListIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Grid2X2Icon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="kanban" aria-label="Kanban view">
        <Kanban className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
