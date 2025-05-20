
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
        // Loading states with simple styling
        Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden border border-slate-200 dark:border-slate-700">
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
          <Card key={doc.id} className="overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-all duration-300">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2">
                {getFileIcon(doc.type)}
                <CardTitle className="text-base truncate">{doc.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <Badge className="mb-2 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                {doc.category}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Uploaded by {doc.uploadedBy} on {doc.uploadDate}</p>
              <div className="mt-2">
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {doc.versions.length} {doc.versions.length === 1 ? 'version' : 'versions'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{doc.size}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewVersions(doc)}
                className="flex items-center gap-1"
              >
                <History className="h-4 w-4" />
                Versions
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(doc.id)}
                className="flex items-center"
              >
                <Download className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default DocumentGridView;
