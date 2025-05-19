
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Document } from "./types";
import DialogHeader from "./DialogHeader";
import VersionSummary from "./VersionSummary";
import VersionsTable from "./VersionsTable";

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader documentName={document.name} />

        <div className="space-y-6 p-2">
          {/* Current Version Summary */}
          <VersionSummary 
            latestVersion={latestVersion} 
            onDownload={onDownload} 
            onNewVersion={onNewVersion} 
          />

          <Separator className="bg-slate-200 dark:bg-slate-700" />

          {/* Version History Table */}
          <VersionsTable 
            versions={document.versions} 
            latestVersion={latestVersion} 
            onDownload={onDownload} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentVersionsDialog;
