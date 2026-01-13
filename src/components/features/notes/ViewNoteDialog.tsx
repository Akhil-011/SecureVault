import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Note } from '@/types';
import { Calendar } from 'lucide-react';

interface ViewNoteDialogProps {
  open: boolean;
  onClose: () => void;
  note: Note;
}

export default function ViewNoteDialog({ open, onClose, note }: ViewNoteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{note.title}</DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {new Date(note.updatedAt).toLocaleString()}</span>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground whitespace-pre-wrap">{note.content}</p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
