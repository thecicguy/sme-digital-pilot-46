
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
