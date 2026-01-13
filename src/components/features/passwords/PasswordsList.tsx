import { useState } from 'react';
import { ArrowLeft, Plus, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVaultStore } from '@/stores/vaultStore';
import PasswordCard from './PasswordCard';
import AddPasswordDialog from './AddPasswordDialog';

interface PasswordsListProps {
  folderId: string;
}

export default function PasswordsList({ folderId }: PasswordsListProps) {
  const { folders, passwords, setSelectedFolder } = useVaultStore();
  const [showAddPassword, setShowAddPassword] = useState(false);
  
  const folder = folders.find((f) => f.id === folderId);
  const folderPasswords = passwords.filter((p) => p.folderId === folderId);

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
              {folderPasswords.length} {folderPasswords.length === 1 ? 'password' : 'passwords'}
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddPassword(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Password
        </Button>
      </div>

      {folderPasswords.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Key className="w-8 h-8 text-amber-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No passwords yet</h3>
            <p className="text-muted-foreground text-sm mt-1">Add your first password to this folder</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {folderPasswords.map((password) => (
            <PasswordCard key={password.id} password={password} />
          ))}
        </div>
      )}

      <AddPasswordDialog
        open={showAddPassword}
        onClose={() => setShowAddPassword(false)}
        folderId={folderId}
      />
    </div>
  );
}
