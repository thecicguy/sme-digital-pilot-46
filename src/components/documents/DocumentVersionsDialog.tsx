
import { Download, Upload, FileBarChart, File, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface DocumentVersion {
  id: string;
  number: number;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  notes?: string;
}

interface Document {
  id: string;
  name: string;
  versions: DocumentVersion[];
}

interface DocumentVersionsDialogProps {
  open: boolean;
  onClose: () => void;
  document: Document;
  onDownload: (versionId: string) => void;
  onNewVersion: () => void;
}

const DocumentVersionsDialog = ({
  open,
  onClose,
  document,
  onDownload,
  onNewVersion,
}: DocumentVersionsDialogProps) => {
  const latestVersion = document.versions.reduce(
    (latest, current) => (current.number > latest.number ? current : latest),
    document.versions[0]
  );

  // Get the file type icon based on the document name
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case "pdf":
        return <File className="h-5 w-5 text-red-500" />;
      case "docx":
      case "doc":
        return <File className="h-5 w-5 text-blue-500" />;
      case "xlsx":
      case "xls":
        return <File className="h-5 w-5 text-green-500" />;
      case "pptx":
      case "ppt":
        return <File className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getFileIcon(document.name)}
            <span className="truncate">{document.name} - Version History</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Version Summary */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Current Version</h3>
              <Button onClick={onNewVersion} size="sm" className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                Upload New Version
              </Button>
            </div>
            
            <div className="rounded-md border p-4 bg-muted/30">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Version</p>
                  <p className="font-medium">v{latestVersion.number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Uploaded By</p>
                  <p>{latestVersion.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upload Date</p>
                  <p>{latestVersion.uploadDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p>{latestVersion.size}</p>
                </div>
              </div>
              {latestVersion.notes && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="mt-1">{latestVersion.notes}</p>
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={() => onDownload(latestVersion.id)} 
                  size="sm"
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Version History */}
          <div className="space-y-3">
            <h3 className="font-medium">All Versions</h3>
            <Table>
              <TableHeader>
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
                {document.versions
                  .sort((a, b) => b.number - a.number) // Sort by version number - newest first
                  .map((version) => (
                    <TableRow key={version.id}>
                      <TableCell>
                        v{version.number}
                        {version.number === latestVersion.number && (
                          <Badge variant="outline" className="ml-2">Latest</Badge>
                        )}
                      </TableCell>
                      <TableCell>{version.uploadedBy}</TableCell>
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
                              className="flex items-center gap-1"
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
                            className="flex items-center gap-1"
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
      </DialogContent>
    </Dialog>
  );
};

export default DocumentVersionsDialog;
