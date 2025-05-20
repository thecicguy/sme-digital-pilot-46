
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DocumentSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const DocumentSearch = ({ searchTerm, setSearchTerm }: DocumentSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-900 p-0 rounded-lg">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          className="pl-9 border-slate-200 dark:border-slate-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        Filter
      </Button>
    </div>
  );
};

export default DocumentSearch;
