
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
  FileBarChart,
  SlidersHorizontal
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
      {/* Header with improved styling */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Document Store</h1>
          <p className="text-muted-foreground mt-1">
            Manage, organize, and share all your business documents.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DocumentTemplates />
          <Button onClick={handleUpload} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
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
        {/* Sidebar with categories - enhanced styling */}
        <div className="lg:col-span-1">
          <Card className="shadow-md border-slate-200 dark:border-slate-700">
            <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-1 p-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Button
                      variant={selectedCategory === category ? "secondary" : "ghost"}
                      className={`w-full justify-start ${
                        selectedCategory === category 
                          ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200" 
                          : ""
                      }`}
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
          {/* Search and filter bar - improved styling */}
          <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-9 border-slate-300 dark:border-slate-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter Documents By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="flex items-center gap-2">
                    <ListFilter className="h-4 w-4" />
                    Date Added
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="flex items-center gap-2">
                    <ListFilter className="h-4 w-4" />
                    File Size
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="flex items-center gap-2">
                    <ListFilter className="h-4 w-4" />
                    File Type
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Document display with improved tabs */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
              <TabsTrigger value="list" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">List View</TabsTrigger>
              <TabsTrigger value="grid" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Grid View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-4">
              <Card className="shadow-md border-slate-200 dark:border-slate-700">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-800">
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
                        // Loading states with improved styling
                        Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
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
                          <TableCell colSpan={7} className="text-center py-12">
                            <div className="flex flex-col items-center space-y-2">
                              <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600" />
                              <p className="text-lg font-medium text-slate-700 dark:text-slate-300">No documents found</p>
                              <p className="text-slate-500 dark:text-slate-400">Try a different search term or category.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDocuments?.map((doc) => (
                          <TableRow key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <TableCell className="flex items-center gap-2 font-medium">
                              {getFileIcon(doc.type)}
                              <span>{doc.name}</span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800">
                                {doc.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{doc.uploadedBy}</TableCell>
                            <TableCell className="hidden md:table-cell">{doc.uploadDate}</TableCell>
                            <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 hover:bg-indigo-200">
                                {doc.versions.length}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewVersions(doc)}
                                  className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                  <History className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                  <span className="sr-only md:not-sr-only">Versions</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleNewVersion(doc.id)}
                                  className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                  <Upload className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  <span className="sr-only md:not-sr-only">New Version</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDownload(doc.id)}
                                  className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                  <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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
                  // Loading states with improved styling
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden shadow-md border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
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
                  <div className="col-span-full text-center py-12">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600" />
                      <p className="text-lg font-medium text-slate-700 dark:text-slate-300">No documents found</p>
                      <p className="text-slate-500 dark:text-slate-400">Try a different search term or category.</p>
                    </div>
                  </div>
                ) : (
                  filteredDocuments?.map((doc) => (
                    <Card key={doc.id} className="overflow-hidden shadow-md border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                      <CardHeader className="p-4 pb-2 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            {getFileIcon(doc.type)}
                            <CardTitle className="text-base truncate">{doc.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <Badge className="mb-2 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                          {doc.category}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Uploaded by {doc.uploadedBy} on {doc.uploadDate}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                            {doc.versions.length} {doc.versions.length === 1 ? 'version' : 'versions'}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewVersions(doc)}
                            className="flex items-center gap-1 text-indigo-700 border-indigo-200 hover:bg-indigo-50 dark:text-indigo-300 dark:border-indigo-800 dark:hover:bg-indigo-900"
                          >
                            <History className="h-4 w-4" />
                            Versions
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(doc.id)}
                            className="flex items-center gap-1 text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900"
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
