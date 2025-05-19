
import { FolderPlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DocumentTemplates from "@/components/documents/DocumentTemplates";

interface DocumentHeaderProps {
  handleUpload: () => void;
}

const DocumentHeader = ({ handleUpload }: DocumentHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl shadow-sm">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Document Store</h1>
        <p className="text-muted-foreground mt-1">
          Manage, organize, and share all your business documents.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <DocumentTemplates />
        <Button onClick={handleUpload} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <FolderPlus className="h-4 w-4" />
          New Folder
        </Button>
      </div>
    </div>
  );
};

export default DocumentHeader;
