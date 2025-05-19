
import { FileText, History, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface Document {
  id: string;
  name: string;
  category: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  tags: string[];
  type: string;
  versions: any[];
}

interface DocumentGridViewProps {
  isLoading: boolean;
  filteredDocuments: Document[] | undefined;
  handleViewVersions: (document: Document) => void;
  handleDownload: (documentId: string) => void;
  getFileIcon: (type: string) => JSX.Element;
}

const DocumentGridView = ({
  isLoading,
  filteredDocuments,
  handleViewVersions,
  handleDownload,
  getFileIcon,
}: DocumentGridViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading ? (
        // Loading states with improved styling
        Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden shadow-md border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-20 w-20 rounded" />
                <Skeleton className="h-5 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </CardContent>
          </Card>
        ))
      ) : filteredDocuments?.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <div className="flex flex-col items-center space-y-2">
            <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600" />
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">No documents found</p>
            <p className="text-slate-500 dark:text-slate-400">Try a different search term or category.</p>
          </div>
        </div>
      ) : (
        filteredDocuments?.map((doc) => (
          <Card key={doc.id} className="overflow-hidden shadow-md border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
            <CardHeader className="p-4 pb-2 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  {getFileIcon(doc.type)}
                  <CardTitle className="text-base truncate">{doc.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <Badge className="mb-2 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                {doc.category}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Uploaded by {doc.uploadedBy} on {doc.uploadDate}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {doc.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  {doc.versions.length} {doc.versions.length === 1 ? 'version' : 'versions'}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <p className="text-xs text-muted-foreground">{doc.size}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewVersions(doc)}
                  className="flex items-center gap-1 text-indigo-700 border-indigo-200 hover:bg-indigo-50 dark:text-indigo-300 dark:border-indigo-800 dark:hover:bg-indigo-900"
                >
                  <History className="h-4 w-4" />
                  Versions
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(doc.id)}
                  className="flex items-center gap-1 text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default DocumentGridView;
