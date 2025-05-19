
import { Download, FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { DocumentVersion } from "@/components/documents/version-history/types";

interface VersionsTableProps {
  versions: DocumentVersion[];
  latestVersion: DocumentVersion;
  onDownload: (versionId: string) => void;
}

const VersionsTable = ({ 
  versions, 
  latestVersion, 
  onDownload 
}: VersionsTableProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-lg text-slate-900 dark:text-slate-50">All Versions</h3>
      <div className="border rounded-md overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-800">
            <TableRow>
              <TableHead>Version</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {versions
              .sort((a, b) => b.number - a.number) // Sort by version number - newest first
              .map((version) => (
                <TableRow key={version.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <TableCell>
                    v{version.number}
                    {version.number === latestVersion.number && (
                      <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Latest</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{version.uploadedBy}</TableCell>
                  <TableCell>{version.uploadDate}</TableCell>
                  <TableCell>{version.size}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {version.notes || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {version.number !== latestVersion.number && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1 border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-900/50"
                          onClick={() => {
                            // Compare feature would be implemented here
                            alert(`Compare with current version would be implemented here`);
                          }}
                        >
                          <FileBarChart className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only">Compare</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownload(version.id)}
                        className="flex items-center gap-1 text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/50"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only">Download</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VersionsTable;
