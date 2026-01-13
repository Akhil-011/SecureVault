import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Document } from '@/types';
import { Calendar, Download, FileBox } from 'lucide-react';

interface ViewDocumentDialogProps {
  open: boolean;
  onClose: () => void;
  document: Document;
}

export default function ViewDocumentDialog({ open, onClose, document }: ViewDocumentDialogProps) {
  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = document.fileData;
    link.download = document.fileName;
    link.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const isImage = document.fileType.startsWith('image/');
  const isPDF = document.fileType === 'application/pdf';
  const isText = document.fileType.startsWith('text/');

  const renderPreview = () => {
    if (isImage) {
      return (
        <div className="flex justify-center items-center bg-vault-dark/30 rounded-lg p-4">
          <img
            src={document.fileData}
            alt={document.name}
            className="max-w-full max-h-[500px] object-contain rounded"
          />
        </div>
      );
    }

    if (isPDF) {
      return (
        <div className="w-full h-[600px] bg-vault-dark/30 rounded-lg overflow-hidden">
          <iframe
            src={document.fileData}
            className="w-full h-full"
            title={document.name}
          />
        </div>
      );
    }

    if (isText) {
      // Decode base64 text content
      try {
        const base64Data = document.fileData.split(',')[1];
        const textContent = atob(base64Data);
        return (
          <div className="bg-vault-dark/30 rounded-lg p-4 max-h-[500px] overflow-auto">
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
              {textContent}
            </pre>
          </div>
        );
      } catch (error) {
        return (
          <div className="text-center py-8 text-muted-foreground">
            Unable to preview text content
          </div>
        );
      }
    }

    // For other file types, show file info
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <FileBox className="w-10 h-10 text-emerald-400" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Preview not available</h3>
          <p className="text-muted-foreground text-sm">
            This file type cannot be previewed in the browser
          </p>
          <p className="text-xs text-muted-foreground">
            {document.fileType} • {formatFileSize(document.fileSize)}
          </p>
        </div>
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download to View
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{document.name}</DialogTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Uploaded: {new Date(document.createdAt).toLocaleString()}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-vault-dark border border-border text-xs">
              {document.fileType}
            </span>
            <span className="text-xs">{formatFileSize(document.fileSize)}</span>
          </div>
        </DialogHeader>

        <div className="py-4 overflow-auto">
          {renderPreview()}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
