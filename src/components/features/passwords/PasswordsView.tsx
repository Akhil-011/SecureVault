import { useState } from 'react';
import { Key, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVaultStore } from '@/stores/vaultStore';
import PasswordCard from './PasswordCard';
import AddPasswordDialog from './AddPasswordDialog';

export default function PasswordsView() {
  const { passwords, setSelectedCategory } = useVaultStore();
  const [showAddPassword, setShowAddPassword] = useState(false);

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
          <h2 className="text-2xl font-bold text-foreground">My Passwords</h2>
          <p className="text-muted-foreground mt-1">
            {passwords.length} {passwords.length === 1 ? 'password' : 'passwords'}
          </p>
        </div>
        <Button onClick={() => setShowAddPassword(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Password
        </Button>
      </div>

      {passwords.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Key className="w-8 h-8 text-amber-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No passwords yet</h3>
            <p className="text-muted-foreground text-sm mt-1">Add your first password to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {passwords.map((password) => (
            <PasswordCard key={password.id} password={password} />
          ))}
        </div>
      )}

      <AddPasswordDialog
        open={showAddPassword}
        onClose={() => setShowAddPassword(false)}
        folderId="default"
      />
    </div>
  );
}
