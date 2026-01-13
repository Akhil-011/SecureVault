import { useState } from 'react';
import { ArrowLeft, Plus, FileBox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVaultStore } from '@/stores/vaultStore';
import DocumentCard from './DocumentCard';
import AddDocumentDialog from './AddDocumentDialog';

interface DocumentsListProps {
  folderId: string;
}

export default function DocumentsList({ folderId }: DocumentsListProps) {
  const { folders, documents, setSelectedFolder } = useVaultStore();
  const [showAddDocument, setShowAddDocument] = useState(false);
  
  const folder = folders.find((f) => f.id === folderId);
  const folderDocuments = documents.filter((d) => d.folderId === folderId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedFolder(null)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{folder?.name}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {folderDocuments.length} {folderDocuments.length === 1 ? 'document' : 'documents'}
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddDocument(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {folderDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <FileBox className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No documents yet</h3>
            <p className="text-muted-foreground text-sm mt-1">Upload your first document to this folder</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {folderDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      )}

      <AddDocumentDialog
        open={showAddDocument}
        onClose={() => setShowAddDocument(false)}
        folderId={folderId}
      />
    </div>
  );
}
