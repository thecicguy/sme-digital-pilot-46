
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
  Calendar
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import CreateContactDialog from "@/components/clients/CreateContactDialog";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import CreateNoteDialog from "@/components/notes/CreateNoteDialog";

const ClientDetail = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

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

  if (isClientLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{client.businessName}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contacts</CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setIsContactDialogOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {isContactsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            ) : contacts && contacts.length > 0 ? (
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.email}</p>
                    </div>
                    <Badge>{contact.role}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No contacts added yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setIsProjectDialogOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {isProjectsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            ) : projects && projects.length > 0 ? (
              <div className="space-y-2">
                {projects.map((project) => (
                  <Link 
                    key={project.id} 
                    to={`/projects/${project.id}`}
                    className="flex items-center justify-between rounded-md border p-2 hover:bg-accent"
                  >
                    <div>
                      <p className="font-medium capitalize">{project.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Badge variant="outline">{project.daysAllocated} days</Badge>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No projects added yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="flex items-center text-sm">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDistanceToNow(new Date(client.createdAt), { addSuffix: true })}
                </p>
              </div>
              {client.location && (
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="flex items-center text-sm">
                    <MapPin className="mr-1 h-3 w-3" />
                    {client.location}
                  </p>
                </div>
              )}
              {client.potentialName && (
                <div>
                  <p className="text-xs text-muted-foreground">Potential Name</p>
                  <p className="flex items-center text-sm">
                    <Building className="mr-1 h-3 w-3" />
                    {client.potentialName}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Description Section - Formerly in Overview tab */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Client Description</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p>{client.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* Notes Section - Formerly in Notes tab */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Notes</h2>
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
          <div className="rounded-lg border border-dashed p-8 text-center">
            <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No notes yet</h3>
            <p className="text-sm text-muted-foreground">
              Notes help you keep track of important information about clients
            </p>
            <Button className="mt-4" onClick={() => setIsNoteDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </div>
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
