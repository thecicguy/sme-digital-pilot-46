
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import DocumentHeader from "@/components/documents/DocumentHeader";
import DocumentSidebar from "@/components/documents/DocumentSidebar";
import DocumentSearch from "@/components/documents/DocumentSearch";
import DocumentTabs from "@/components/documents/DocumentTabs";
import DocumentVersionsDialog from "@/components/documents/DocumentVersionsDialog";
import { getFileIcon } from "@/components/documents/DocumentUtils";

// Mock data for documents with versions
const mockDocuments = [
  {
    id: "doc-1",
    name: "Project Proposal.pdf",
    category: "Proposals",
    uploadedBy: "John Doe",
    uploadDate: "2024-05-10",
    size: "2.4 MB",
    tags: ["Client", "Proposal"],
    type: "pdf",
    versions: [
      {
        id: "v1-doc-1",
        number: 1,
        uploadedBy: "John Doe",
        uploadDate: "2024-05-10",
        size: "2.4 MB",
        notes: "Initial draft"
      },
      {
        id: "v2-doc-1",
        number: 2,
        uploadedBy: "Jane Smith",
        uploadDate: "2024-05-12",
        size: "2.5 MB",
        notes: "Updated with client feedback"
      },
      {
        id: "v3-doc-1",
        number: 3,
        uploadedBy: "John Doe",
        uploadDate: "2024-05-15",
        size: "2.4 MB",
        notes: "Final version"
      }
    ]
  },
  {
    id: "doc-2",
    name: "Contract Agreement.docx",
    category: "Contracts",
    uploadedBy: "Jane Smith",
    uploadDate: "2024-05-12",
    size: "1.8 MB",
    tags: ["Legal", "Contract"],
    type: "docx",
    versions: [
      {
        id: "v1-doc-2",
        number: 1,
        uploadedBy: "Jane Smith",
        uploadDate: "2024-05-12",
        size: "1.8 MB",
        notes: "Initial contract draft"
      }
    ]
  },
  {
    id: "doc-3",
    name: "Financial Report Q1.xlsx",
    category: "Financial",
    uploadedBy: "Robert Johnson",
    uploadDate: "2024-05-05",
    size: "3.2 MB",
    tags: ["Finance", "Report"],
    type: "xlsx",
    versions: [
      {
        id: "v1-doc-3",
        number: 1,
        uploadedBy: "Robert Johnson",
        uploadDate: "2024-05-02",
        size: "3.0 MB",
        notes: "Preliminary data"
      },
      {
        id: "v2-doc-3",
        number: 2,
        uploadedBy: "Robert Johnson",
        uploadDate: "2024-05-05",
        size: "3.2 MB",
        notes: "Updated with final numbers"
      }
    ]
  },
  {
    id: "doc-4",
    name: "Meeting Minutes.pdf",
    category: "Meetings",
    uploadedBy: "Sarah Williams",
    uploadDate: "2024-05-15",
    size: "0.9 MB",
    tags: ["Internal", "Meeting"],
    type: "pdf",
    versions: [
      {
        id: "v1-doc-4",
        number: 1,
        uploadedBy: "Sarah Williams",
        uploadDate: "2024-05-15",
        size: "0.9 MB",
        notes: "Meeting notes"
      }
    ]
  },
  {
    id: "doc-5",
    name: "Marketing Strategy.pptx",
    category: "Marketing",
    uploadedBy: "Michael Brown",
    uploadDate: "2024-05-08",
    size: "5.6 MB",
    tags: ["Marketing", "Strategy"],
    type: "pptx",
    versions: [
      {
        id: "v1-doc-5",
        number: 1,
        uploadedBy: "Michael Brown",
        uploadDate: "2024-05-05",
        size: "5.2 MB",
        notes: "First draft"
      },
      {
        id: "v2-doc-5",
        number: 2,
        uploadedBy: "Michael Brown",
        uploadDate: "2024-05-08",
        size: "5.6 MB",
        notes: "Updated with new campaign data"
      }
    ]
  },
];

// Document categories
const categories = [
  "All Documents",
  "Contracts",
  "Proposals",
  "Financial",
  "Marketing",
  "Meetings",
  "Templates",
  "Miscellaneous"
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Documents");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isVersionsDialogOpen, setIsVersionsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Fetch documents with React Query (using mock data for now)
  const { data: documents, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return mockDocuments;
    }
  });
  
  // Filter documents based on search term and category
  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All Documents" || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle document upload
  const handleUpload = () => {
    toast({
      title: "Upload initiated",
      description: "Document upload feature will be implemented soon.",
    });
  };
  
  // Handle document download
  const handleDownload = (documentId: string) => {
    toast({
      title: "Download initiated",
      description: `Downloading document ID: ${documentId}`,
    });
  };
  
  // Handle showing version history
  const handleViewVersions = (document: any) => {
    setSelectedDocument(document);
    setIsVersionsDialogOpen(true);
  };

  // Handle uploading new version
  const handleNewVersion = (documentId: string) => {
    toast({
      title: "New version upload initiated",
      description: `Uploading new version for document ID: ${documentId}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <DocumentHeader handleUpload={handleUpload} />
      
      <div className="space-y-6">
        {/* Categories at the top */}
        <DocumentSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        {/* Main content area */}
        <div className="space-y-4">
          {/* Search and filter bar */}
          <DocumentSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          {/* Document display with tabs */}
          <DocumentTabs
            isLoading={isLoading}
            filteredDocuments={filteredDocuments}
            handleViewVersions={handleViewVersions}
            handleNewVersion={handleNewVersion}
            handleDownload={handleDownload}
            getFileIcon={getFileIcon}
          />
        </div>
      </div>

      {/* Document Versions Dialog */}
      {selectedDocument && (
        <DocumentVersionsDialog
          open={isVersionsDialogOpen}
          onClose={() => setIsVersionsDialogOpen(false)}
          document={selectedDocument}
          onDownload={handleDownload}
          onNewVersion={() => handleNewVersion(selectedDocument.id)}
        />
      )}
    </div>
  );
};

export default Documents;
