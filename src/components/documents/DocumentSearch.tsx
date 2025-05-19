
import { Search, SlidersHorizontal, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const DocumentSearch = ({ searchTerm, setSearchTerm }: DocumentSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          className="pl-9 border-slate-300 dark:border-slate-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter Documents By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              Date Added
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              File Size
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              File Type
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DocumentSearch;
