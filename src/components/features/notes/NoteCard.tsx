import { useState } from 'react';
import { FileText, Trash2, Edit, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Note } from '@/types';
import { useVaultStore } from '@/stores/vaultStore';
import { useToast } from '@/hooks/use-toast';
import EditNoteDialog from './EditNoteDialog';
import ViewNoteDialog from './ViewNoteDialog';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const { deleteNote } = useVaultStore();
  const { toast } = useToast();
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);

  const handleDelete = () => {
    deleteNote(note.id);
    toast({
      title: "Note deleted",
      description: "The note has been removed",
    });
  };

  const preview = note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '');

  return (
    <>
      <Card 
        className="p-5 vault-card border hover:border-primary/30 transition-all cursor-pointer group"
        onClick={() => setShowView(true)}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{note.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowView(true);
                }}
                className="h-8 w-8 p-0"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEdit(true);
                }}
                className="h-8 w-8 p-0"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-3">
            {preview}
          </p>
        </div>
      </Card>

      <ViewNoteDialog
        open={showView}
        onClose={() => setShowView(false)}
        note={note}
      />

      <EditNoteDialog
        open={showEdit}
        onClose={() => setShowEdit(false)}
        note={note}
      />
    </>
  );
}
