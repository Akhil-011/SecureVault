import { useState } from 'react';
import { FileBox, Download, Trash2, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Document } from '@/types';
import { useVaultStore } from '@/stores/vaultStore';
import { useToast } from '@/hooks/use-toast';
import ViewDocumentDialog from './ViewDocumentDialog';

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const { deleteDocument } = useVaultStore();
  const { toast } = useToast();
  const [showView, setShowView] = useState(false);

  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = document.fileData;
    link.download = document.fileName;
    link.click();
    toast({
      title: "Download started",
      description: `Downloading ${document.fileName}`,
    });
  };

  const handleDelete = () => {
    deleteDocument(document.id);
    toast({
      title: "Document deleted",
      description: "The document has been removed",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <>
    <Card className="p-5 vault-card border hover:border-primary/30 transition-all group">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <FileBox className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{document.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {document.fileName}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-vault-dark border border-border">
                {document.fileType}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(document.fileSize)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowView(true)}
            className="flex-1 gap-2"
          >
            <Eye className="w-4 h-4" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex-1 gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Uploaded {new Date(document.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Card>

    <ViewDocumentDialog
      open={showView}
      onClose={() => setShowView(false)}
      document={document}
    />
    </>
  );
}
