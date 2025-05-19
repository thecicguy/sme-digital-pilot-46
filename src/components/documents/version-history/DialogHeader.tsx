
import { File } from "lucide-react";
import { DialogHeader as UIDialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getFileIcon } from "@/components/documents/DocumentUtils";

interface DialogHeaderProps {
  documentName: string;
}

const DialogHeader = ({ documentName }: DialogHeaderProps) => {
  return (
    <UIDialogHeader className="bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800 dark:to-blue-900/30 -m-4 p-6 mb-0 rounded-t-lg border-b border-slate-200 dark:border-slate-700">
      <DialogTitle className="flex items-center gap-2 text-xl text-slate-900 dark:text-slate-50">
        {getFileIcon(documentName.split('.').pop() || '')}
        <span className="truncate">{documentName} - Version History</span>
      </DialogTitle>
    </UIDialogHeader>
  );
};

export default DialogHeader;
