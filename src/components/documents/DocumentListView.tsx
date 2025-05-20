
import { History, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

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

interface DocumentListViewProps {
  isLoading: boolean;
  filteredDocuments: Document[] | undefined;
  handleViewVersions: (document: Document) => void;
  handleNewVersion: (documentId: string) => void;
  handleDownload: (documentId: string) => void;
  getFileIcon: (type: string) => JSX.Element;
}

const DocumentListView = ({
  isLoading,
  filteredDocuments,
  handleViewVersions,
  handleNewVersion,
  handleDownload,
  getFileIcon,
}: DocumentListViewProps) => {
  return (
    <Table>
      <TableHeader className="bg-white dark:bg-slate-900">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Uploaded By</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Versions</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          // Loading states
          Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-6 w-[200px]" /></TableCell>
              <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
              <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
              <TableCell><Skeleton className="h-6 w-[80px]" /></TableCell>
              <TableCell><Skeleton className="h-6 w-[50px]" /></TableCell>
              <TableCell><Skeleton className="h-6 w-[50px]" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-6 w-[80px] ml-auto" /></TableCell>
            </TableRow>
          ))
        ) : filteredDocuments?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-10">
              No documents found
            </TableCell>
          </TableRow>
        ) : (
          filteredDocuments?.map((doc) => (
            <TableRow key={doc.id} className="border-b">
              <TableCell className="flex items-center gap-2 font-medium">
                {getFileIcon(doc.type)}
                <span>{doc.name}</span>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-slate-50 dark:bg-slate-900">
                  {doc.category}
                </Badge>
              </TableCell>
              <TableCell>{doc.uploadedBy}</TableCell>
              <TableCell>{doc.uploadDate}</TableCell>
              <TableCell>{doc.size}</TableCell>
              <TableCell>
                <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                  {doc.versions.length}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewVersions(doc)}
                    className="flex items-center gap-1"
                  >
                    <History className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Versions</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(doc.id)}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default DocumentListView;
