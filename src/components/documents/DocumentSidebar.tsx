
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface DocumentSidebarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const DocumentSidebar = ({ 
  categories,
  selectedCategory,
  setSelectedCategory
}: DocumentSidebarProps) => {
  return (
    <Card className="border shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base text-slate-700 dark:text-slate-300">
          <FileText className="h-5 w-5" />
          Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-wrap gap-2 p-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              className={`text-sm font-normal ${
                selectedCategory === category 
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300" 
                  : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentSidebar;
