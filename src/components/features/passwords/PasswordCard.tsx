import { useState } from 'react';
import { Key, Eye, EyeOff, Copy, Trash2, Edit, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Password } from '@/types';
import { useVaultStore } from '@/stores/vaultStore';
import { useToast } from '@/hooks/use-toast';
import EditPasswordDialog from './EditPasswordDialog';

interface PasswordCardProps {
  password: Password;
}

export default function PasswordCard({ password }: PasswordCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { deletePassword } = useVaultStore();
  const { toast } = useToast();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} copied`,
      description: "Copied to clipboard",
    });
  };

  const handleDelete = () => {
    deletePassword(password.id);
    toast({
      title: "Password deleted",
      description: "The password has been removed",
    });
  };

  return (
    <>
      <Card className="p-5 vault-card border hover:border-primary/30 transition-all group">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Key className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{password.title}</h3>
                {password.url && (
                  <a
                    href={password.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                  >
                    <span className="truncate">{password.url}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                )}
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEdit(true)}
                className="h-8 w-8 p-0"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Username</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(password.username, 'Username')}
                  className="h-6 px-2 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
              <p className="text-sm text-foreground font-mono bg-vault-dark px-3 py-2 rounded border border-border truncate">
                {password.username}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Password</label>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-6 px-2 text-xs"
                  >
                    {showPassword ? (
                      <EyeOff className="w-3 h-3 mr-1" />
                    ) : (
                      <Eye className="w-3 h-3 mr-1" />
                    )}
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(password.password, 'Password')}
                    className="h-6 px-2 text-xs"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
              <p className="text-sm text-foreground font-mono bg-vault-dark px-3 py-2 rounded border border-border truncate">
                {showPassword ? password.password : '••••••••••••'}
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Updated {new Date(password.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </Card>

      <EditPasswordDialog
        open={showEdit}
        onClose={() => setShowEdit(false)}
        password={password}
      />
    </>
  );
}
