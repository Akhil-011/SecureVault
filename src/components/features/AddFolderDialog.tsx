import { useState } from 'react';
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
import { Category } from '@/types';
import { useVaultStore } from '@/stores/vaultStore';
import { useToast } from '@/hooks/use-toast';

interface AddFolderDialogProps {
  open: boolean;
  onClose: () => void;
  category: Category;
}

export default function AddFolderDialog({ open, onClose, category }: AddFolderDialogProps) {
  const [name, setName] = useState('');
  const { addFolder } = useVaultStore();
  const { toast } = useToast();

  const handleCreate = () => {
    if (!name.trim()) {
      toast({
        title: "Missing name",
        description: "Please provide a folder name",
        variant: "destructive",
      });
      return;
    }

    addFolder(name, category);
    toast({
      title: "Folder created",
      description: `${name} has been created`,
    });
    setName('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
          <DialogDescription>
            Create a new folder for organizing your {category}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="folder-name">Folder Name</Label>
            <Input
              id="folder-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter folder name..."
              onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleCreate} className="flex-1">
              Create Folder
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
