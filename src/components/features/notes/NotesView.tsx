import { useState } from 'react';
import { FileText, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVaultStore } from '@/stores/vaultStore';
import NoteCard from './NoteCard';
import AddNoteDialog from './AddNoteDialog';

export default function NotesView() {
  const { notes, setSelectedCategory } = useVaultStore();
  const [showAddNote, setShowAddNote] = useState(false);

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
          <h2 className="text-2xl font-bold text-foreground">My Notes</h2>
          <p className="text-muted-foreground mt-1">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </p>
        </div>
        <Button onClick={() => setShowAddNote(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No notes yet</h3>
            <p className="text-muted-foreground text-sm mt-1">Create your first note to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}

      <AddNoteDialog
        open={showAddNote}
        onClose={() => setShowAddNote(false)}
        folderId="default"
      />
    </div>
  );
}
