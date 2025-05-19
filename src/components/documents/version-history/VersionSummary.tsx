
import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentVersion } from "@/components/documents/version-history/types";

interface VersionSummaryProps {
  latestVersion: DocumentVersion;
  onDownload: (versionId: string) => void;
  onNewVersion: () => void;
}

const VersionSummary = ({
  latestVersion,
  onDownload,
  onNewVersion
}: VersionSummaryProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg text-slate-900 dark:text-slate-50">Current Version</h3>
        <Button 
          onClick={onNewVersion} 
          size="sm" 
          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Upload className="h-4 w-4" />
          Upload New Version
        </Button>
      </div>
      
      <div className="rounded-md border p-4 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Version</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">v{latestVersion.number}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Uploaded By</p>
            <p className="text-slate-700 dark:text-slate-300">{latestVersion.uploadedBy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Upload Date</p>
            <p className="text-slate-700 dark:text-slate-300">{latestVersion.uploadDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Size</p>
            <p className="text-slate-700 dark:text-slate-300">{latestVersion.size}</p>
          </div>
        </div>
        {latestVersion.notes && (
          <div className="mt-4 bg-slate-50 dark:bg-slate-800 p-3 rounded-md border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Notes</p>
            <p className="mt-1 text-slate-700 dark:text-slate-300">{latestVersion.notes}</p>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={() => onDownload(latestVersion.id)} 
            size="sm"
            variant="secondary"
            className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VersionSummary;
