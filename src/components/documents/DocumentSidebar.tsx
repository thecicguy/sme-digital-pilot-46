
import { Book } from "lucide-react";
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
    <Card className="shadow-md border-slate-200 dark:border-slate-700">
      <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="space-y-1 p-2">
          {categories.map((category) => (
            <li key={category}>
              <Button
                variant={selectedCategory === category ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  selectedCategory === category 
                    ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200" 
                    : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DocumentSidebar;
