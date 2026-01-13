import { Folder as FolderIcon, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder } from '@/types';
import { useVaultStore } from '@/stores/vaultStore';
import { useToast } from '@/hooks/use-toast';

interface FolderCardProps {
  folder: Folder;
  onClick: () => void;
}

export default function FolderCard({ folder, onClick }: FolderCardProps) {
  const { notes, passwords, documents, deleteFolder } = useVaultStore();
  const { toast } = useToast();

  const getItemCount = () => {
    if (folder.category === 'notes') {
      return notes.filter((n) => n.folderId === folder.id).length;
    } else if (folder.category === 'passwords') {
      return passwords.filter((p) => p.folderId === folder.id).length;
    } else {
      return documents.filter((d) => d.folderId === folder.id).length;
    }
  };

  const itemCount = getItemCount();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFolder(folder.id);
    toast({
      title: "Folder deleted",
      description: "The folder and its contents have been removed",
    });
  };

  return (
    <Card 
      onClick={onClick}
      className="p-6 vault-card border hover:border-primary/30 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <FolderIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg">{folder.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Updated {new Date(folder.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive h-8 w-8 p-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
