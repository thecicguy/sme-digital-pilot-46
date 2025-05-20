
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentListView from "./DocumentListView";

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

interface DocumentTabsProps {
  isLoading: boolean;
  filteredDocuments: Document[] | undefined;
  handleViewVersions: (document: Document) => void;
  handleNewVersion: (documentId: string) => void;
  handleDownload: (documentId: string) => void;
  getFileIcon: (type: string) => JSX.Element;
}

const DocumentTabs = ({
  isLoading,
  filteredDocuments,
  handleViewVersions,
  handleNewVersion,
  handleDownload,
  getFileIcon,
}: DocumentTabsProps) => {
  return (
    <Tabs defaultValue="list" className="w-full">
      <div className="border-b mb-4">
        <TabsList className="bg-transparent">
          <TabsTrigger value="list" className="text-sm py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none">
            List View
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="list" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <DocumentListView
              isLoading={isLoading}
              filteredDocuments={filteredDocuments}
              handleViewVersions={handleViewVersions}
              handleNewVersion={handleNewVersion}
              handleDownload={handleDownload}
              getFileIcon={getFileIcon}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentTabs;
