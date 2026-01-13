import { useState } from 'react';
import { Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useVaultStore } from '@/stores/vaultStore';
import { useToast } from '@/hooks/use-toast';

interface AddDocumentDialogProps {
  open: boolean;
  onClose: () => void;
  folderId: string;
}

export default function AddDocumentDialog({ open, onClose, folderId }: AddDocumentDialogProps) {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { addDocument } = useVaultStore();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!name) {
        setName(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !file) {
      toast({
        title: "Missing fields",
        description: "Please provide a name and select a file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result as string;
      addDocument(
        name,
        file.name,
        file.type,
        file.size,
        fileData,
        folderId
      );
      toast({
        title: "Document uploaded",
        description: "Your document has been stored securely",
      });
      setName('');
      setFile(null);
      onClose();
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Add a new document to this folder
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="document-name">Document Name</Label>
            <Input
              id="document-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter document name..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document-file">Select File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="document-file"
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            {file && (
              <p className="text-xs text-muted-foreground">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1 gap-2">
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
