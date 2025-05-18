
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  fetchClient, 
  fetchContacts, 
  fetchProjects,
  fetchNotes
} from "@/lib/api";
import { 
  ArrowLeft, 
  Users, 
  Briefcase, 
  FileText, 
  Plus,
  Building,
  MapPin,
  Calendar,
  Globe,
  Mail,
  Phone,
  File,
  MessageSquare,
  Upload
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import CreateContactDialog from "@/components/clients/CreateContactDialog";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import CreateNoteDialog from "@/components/notes/CreateNoteDialog";

const ClientDetail = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: client, isLoading: isClientLoading } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => clientId ? fetchClient(clientId) : undefined,
    enabled: !!clientId
  });

  const { data: contacts, isLoading: isContactsLoading } = useQuery({
    queryKey: ["clientContacts", clientId],
    queryFn: () => clientId ? fetchContacts(clientId) : [],
    enabled: !!clientId
  });

  const { data: projects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ["clientProjects", clientId],
    queryFn: () => clientId ? fetchProjects(clientId) : [],
    enabled: !!clientId
  });

  const { data: notes, isLoading: isNotesLoading } = useQuery({
    queryKey: ["clientNotes", clientId],
    queryFn: () => clientId ? fetchNotes(clientId) : [],
    enabled: !!clientId
  });

  const handleUploadDocument = () => {
    toast({
      title: "Upload initiated",
      description: "Document upload feature will be implemented soon."
    });
  };

  if (isClientLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <h2 className="text-2xl font-semibold">Client not found</h2>
        <p className="text-muted-foreground">The client you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link to="/clients">Back to Clients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{client.businessName}</h1>
        </div>
      </div>

      {/* Business Details Section - Changed from Company Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Building className="h-5 w-5" />
          Business Details
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Business Name</p>
                  <p className="text-base">{client.businessName}</p>
                </div>
                
                {client.potentialName && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Trading Name</p>
                    <p className="text-base">{client.potentialName}</p>
                  </div>
                )}

                {client.location && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p className="text-base flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {client.location}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-base flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDistanceToNow(new Date(client.createdAt), { addSuffix: true })}
                  </p>
                </div>
                
                {/* Placeholder for website, email, etc. that would come from extended client data */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Website</p>
                  <p className="text-base text-muted-foreground flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    Not provided
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base text-muted-foreground flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Not provided
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Description Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Client Description
        </h2>
        <Card>
          <CardContent className="pt-6">
            <p>{client.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Contacts
          </h2>
          <Button size="sm" onClick={() => setIsContactDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
        
        {isContactsLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : contacts && contacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <CardDescription>
                    <Badge className="capitalize">{contact.role}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
                        {contact.email}
                      </a>
                    </div>
                    {contact.mobileNumber && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`tel:${contact.mobileNumber}`} className="text-sm hover:underline">
                          {contact.mobileNumber}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No contacts yet</h3>
              <p className="text-sm text-muted-foreground">
                Add contacts to keep track of important people for this client
              </p>
              <Button className="mt-4" onClick={() => setIsContactDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Notes
          </h2>
          <Button size="sm" onClick={() => setIsNoteDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </div>
        
        {isNotesLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : notes && notes.length > 0 ? (
          notes.map((note) => (
            <Card key={note.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge>{note.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p>{note.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No notes yet</h3>
              <p className="text-sm text-muted-foreground">
                Notes help you keep track of important information about clients
              </p>
              <Button className="mt-4" onClick={() => setIsNoteDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Emails Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Emails
        </h2>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Mail className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No emails yet</h3>
            <p className="text-sm text-muted-foreground">
              Email communications with this client will appear here
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Document Store Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <File className="h-5 w-5" />
            Document Store
          </h2>
          <Button size="sm" onClick={handleUploadDocument}>
            <Upload className="mr-2 h-4 w-4" />
            Add Document
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-6 text-center">
            <File className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No documents yet</h3>
            <p className="text-sm text-muted-foreground">
              Documents related to this client will appear here
            </p>
            <Button className="mt-4" onClick={handleUploadDocument}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Projects Related to this Client - Kept for reference */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Projects
          </h2>
          <Button size="sm" onClick={() => setIsProjectDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
        
        {isProjectsLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg capitalize">{project.type}</CardTitle>
                  <CardDescription>
                    Created {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{project.daysAllocated} days</Badge>
                    <Button size="sm" asChild>
                      <Link to={`/projects/${project.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <Briefcase className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No projects yet</h3>
              <p className="text-sm text-muted-foreground">
                Create a project to start working with this client
              </p>
              <Button className="mt-4" onClick={() => setIsProjectDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {clientId && (
        <>
          <CreateContactDialog
            open={isContactDialogOpen}
            onClose={() => setIsContactDialogOpen(false)}
            clientId={clientId}
          />

          <CreateProjectDialog
            open={isProjectDialogOpen}
            onClose={() => setIsProjectDialogOpen(false)}
            clientId={clientId}
          />

          <CreateNoteDialog
            open={isNoteDialogOpen}
            onClose={() => setIsNoteDialogOpen(false)}
            clientId={clientId}
          />
        </>
      )}
    </div>
  );
};

export default ClientDetail;
