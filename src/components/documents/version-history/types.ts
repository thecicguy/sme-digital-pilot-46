
export interface DocumentVersion {
  id: string;
  number: number;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  notes?: string;
}

export interface Document {
  id: string;
  name: string;
  versions: DocumentVersion[];
}
