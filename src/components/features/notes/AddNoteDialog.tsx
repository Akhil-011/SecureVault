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
import { Textarea } from '@/components/ui/textarea';
import { useVaultStore } from '@/stores/vaultStore';
import { useToast } from '@/hooks/use-toast';

interface AddNoteDialogProps {
  open: boolean;
  onClose: () => void;
  folderId: string;
}

export default function AddNoteDialog({ open, onClose, folderId }: AddNoteDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addNote } = useVaultStore();
  const { toast } = useToast();

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please provide both title and content",
        variant: "destructive",
      });
      return;
    }

    addNote(title, content, folderId);
    toast({
      title: "Note created",
      description: "Your note has been saved",
    });
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
          <DialogDescription>
            Create a new note in this folder
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="note-title">Title</Label>
            <Input
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note-content">Content</Label>
            <Textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="min-h-[200px] resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Note
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
