
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Book, 
  FileText, 
  FolderPlus, 
  Search, 
  Upload, 
  Filter, 
  ListFilter,
  Download,
  History,
  FileBarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import DocumentVersionsDialog from "@/components/documents/DocumentVersionsDialog";
import DocumentTemplates from "@/components/documents/DocumentTemplates";

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
  
  // Get file icon based on type
  const getFileIcon = (type: string) => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Store</h1>
          <p className="text-muted-foreground">
            Manage, organize, and share all your business documents.
          </p>
        </div>
        <div className="flex gap-2">
          <DocumentTemplates />
          <Button onClick={handleUpload} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FolderPlus className="h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-1 p-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Button
                      variant={selectedCategory === category ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search and filter bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Date Added</DropdownMenuItem>
                <DropdownMenuItem>File Size</DropdownMenuItem>
                <DropdownMenuItem>File Type</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Document display */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="hidden md:table-cell">Uploaded By</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="hidden md:table-cell">Size</TableHead>
                        <TableHead className="hidden md:table-cell">Versions</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        // Loading states
                        Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i}>
                            <TableCell><Skeleton className="h-6 w-[200px]" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                            <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-[100px]" /></TableCell>
                            <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-[80px]" /></TableCell>
                            <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-[50px]" /></TableCell>
                            <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-[50px]" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-6 w-[80px] ml-auto" /></TableCell>
                          </TableRow>
                        ))
                      ) : filteredDocuments?.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            No documents found. Try a different search term or category.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDocuments?.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="flex items-center gap-2">
                              {getFileIcon(doc.type)}
                              <span>{doc.name}</span>
                            </TableCell>
                            <TableCell>{doc.category}</TableCell>
                            <TableCell className="hidden md:table-cell">{doc.uploadedBy}</TableCell>
                            <TableCell className="hidden md:table-cell">{doc.uploadDate}</TableCell>
                            <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant="outline">{doc.versions.length}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewVersions(doc)}
                                  className="flex items-center gap-1"
                                >
                                  <History className="h-4 w-4" />
                                  <span className="sr-only md:not-sr-only">Versions</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleNewVersion(doc.id)}
                                  className="flex items-center gap-1"
                                >
                                  <Upload className="h-4 w-4" />
                                  <span className="sr-only md:not-sr-only">New Version</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDownload(doc.id)}
                                  className="flex items-center gap-1"
                                >
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only md:not-sr-only">Download</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="grid" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                  // Loading states
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center space-y-4">
                          <Skeleton className="h-20 w-20 rounded" />
                          <Skeleton className="h-5 w-[150px]" />
                          <Skeleton className="h-4 w-[100px]" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : filteredDocuments?.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    No documents found. Try a different search term or category.
                  </div>
                ) : (
                  filteredDocuments?.map((doc) => (
                    <Card key={doc.id} className="overflow-hidden">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            {getFileIcon(doc.type)}
                            <CardTitle className="text-base truncate">{doc.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-sm text-muted-foreground">{doc.category}</p>
                        <p className="text-xs text-muted-foreground mt-1">Uploaded by {doc.uploadedBy} on {doc.uploadDate}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {doc.versions.length} {doc.versions.length === 1 ? 'version' : 'versions'}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewVersions(doc)}
                            className="flex items-center gap-1"
                          >
                            <History className="h-4 w-4" />
                            Versions
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(doc.id)}
                            className="flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
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
