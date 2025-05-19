
import { FileText, History, Upload, Download } from "lucide-react";
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
      <TableHeader className="bg-slate-50 dark:bg-slate-800">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="hidden md:table-cell">Uploaded By</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="hidden md:table-cell">Size</TableHead>
          <TableHead className="hidden md:table-cell">Versions</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          // Loading states
          Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <TableCell><Skeleton className="h-6 w-[200px]" /></TableCell>
              <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-[100px]" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-[80px]" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-[50px]" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-[50px]" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-6 w-[80px] ml-auto" /></TableCell>
            </TableRow>
          ))
        ) : filteredDocuments?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-12">
              <div className="flex flex-col items-center space-y-2">
                <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600" />
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">No documents found</p>
                <p className="text-slate-500 dark:text-slate-400">Try a different search term or category.</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          filteredDocuments?.map((doc) => (
            <TableRow key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <TableCell className="flex items-center gap-2 font-medium">
                {getFileIcon(doc.type)}
                <span>{doc.name}</span>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800">
                  {doc.category}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{doc.uploadedBy}</TableCell>
              <TableCell className="hidden md:table-cell">{doc.uploadDate}</TableCell>
              <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 hover:bg-indigo-200">
                  {doc.versions.length}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewVersions(doc)}
                    className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <History className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="sr-only md:not-sr-only">Versions</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNewVersion(doc.id)}
                    className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Upload className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="sr-only md:not-sr-only">New Version</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(doc.id)}
                    className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="sr-only md:not-sr-only">Download</span>
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
