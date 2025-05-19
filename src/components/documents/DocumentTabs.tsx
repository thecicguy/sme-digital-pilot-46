
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentListView from "./DocumentListView";
import DocumentGridView from "./DocumentGridView";

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
      <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
        <TabsTrigger value="list" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
          List View
        </TabsTrigger>
        <TabsTrigger value="grid" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
          Grid View
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="list" className="mt-4">
        <Card className="shadow-md border-slate-200 dark:border-slate-700">
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
      
      <TabsContent value="grid" className="mt-4">
        <DocumentGridView
          isLoading={isLoading}
          filteredDocuments={filteredDocuments}
          handleViewVersions={handleViewVersions}
          handleDownload={handleDownload}
          getFileIcon={getFileIcon}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DocumentTabs;
