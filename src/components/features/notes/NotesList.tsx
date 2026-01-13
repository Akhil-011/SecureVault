import { useState } from 'react';
import { ArrowLeft, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVaultStore } from '@/stores/vaultStore';
import NoteCard from './NoteCard';
import AddNoteDialog from './AddNoteDialog';

interface NotesListProps {
  folderId: string;
}

export default function NotesList({ folderId }: NotesListProps) {
  const { folders, notes, setSelectedFolder } = useVaultStore();
  const [showAddNote, setShowAddNote] = useState(false);
  
  const folder = folders.find((f) => f.id === folderId);
  const folderNotes = notes.filter((n) => n.folderId === folderId);

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
              {folderNotes.length} {folderNotes.length === 1 ? 'note' : 'notes'}
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddNote(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Note
        </Button>
      </div>

      {folderNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No notes yet</h3>
            <p className="text-muted-foreground text-sm mt-1">Create your first note in this folder</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {folderNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}

      <AddNoteDialog
        open={showAddNote}
        onClose={() => setShowAddNote(false)}
        folderId={folderId}
      />
    </div>
  );
}
