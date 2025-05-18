
import { ListIcon, Grid2X2Icon, Kanban } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ViewToggleProps {
  view: string;
  onViewChange: (view: string) => void;
  showKanban?: boolean;
}

export function ViewToggle({ view, onViewChange, showKanban = false }: ViewToggleProps) {
  return (
    <ToggleGroup type="single" value={view} onValueChange={(value) => {
      if (value) {
        onViewChange(value);
      }
    }}>
      <ToggleGroupItem value="list" aria-label="List view">
        <ListIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Grid2X2Icon className="h-4 w-4" />
      </ToggleGroupItem>
      {showKanban && (
        <ToggleGroupItem value="kanban" aria-label="Kanban view">
          <Kanban className="h-4 w-4" />
        </ToggleGroupItem>
      )}
    </ToggleGroup>
  );
}
