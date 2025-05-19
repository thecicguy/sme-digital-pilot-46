
import { FileText } from "lucide-react";

// Get file icon based on type
export const getFileIcon = (type: string) => {
  switch(type) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "docx":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "xlsx":
      return <FileText className="h-5 w-5 text-green-500" />;
    case "pptx":
      return <FileText className="h-5 w-5 text-orange-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};
