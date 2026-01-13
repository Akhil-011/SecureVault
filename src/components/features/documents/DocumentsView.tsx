import { useState } from 'react';
import { FileBox, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVaultStore } from '@/stores/vaultStore';
import DocumentCard from './DocumentCard';
import AddDocumentDialog from './AddDocumentDialog';

export default function DocumentsView() {
  const { documents, setSelectedCategory } = useVaultStore();
  const [showAddDocument, setShowAddDocument] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setSelectedCategory(null)}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Documents</h2>
          <p className="text-muted-foreground mt-1">
            {documents.length} {documents.length === 1 ? 'document' : 'documents'}
          </p>
        </div>
        <Button onClick={() => setShowAddDocument(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Document
        </Button>
      </div>

      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <FileBox className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No documents yet</h3>
            <p className="text-muted-foreground text-sm mt-1">Upload your first document to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      )}

      <AddDocumentDialog
        open={showAddDocument}
        onClose={() => setShowAddDocument(false)}
        folderId="default"
      />
    </div>
  );
}
