
import React from "react";
import { cn } from "@/lib/utils";

interface CalendarFilterBarProps {
  activeFilter: "all" | "projects" | "tasks" | "meetings" | "other";
  onFilterChange: (filter: "all" | "projects" | "tasks" | "meetings" | "other") => void;
}

const CalendarFilterBar: React.FC<CalendarFilterBarProps> = ({
  activeFilter,
  onFilterChange
}) => {
  const filterOptions = [
    { id: "all", label: "All" },
    { id: "projects", label: "Projects" },
    { id: "tasks", label: "Tasks" },
    { id: "meetings", label: "Meetings" }
  ];
  
  return (
    <div className="bg-muted/20 border-b px-6 py-2">
      <div className="flex space-x-8">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            className={cn(
              "px-3 py-2 text-sm font-medium relative",
              activeFilter === option.id 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onFilterChange(option.id as any)}
          >
            {option.label}
            {activeFilter === option.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarFilterBar;
