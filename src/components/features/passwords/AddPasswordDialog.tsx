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
import { useVaultStore } from '@/stores/vaultStore';
import { useToast } from '@/hooks/use-toast';

interface AddPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  folderId: string;
}

export default function AddPasswordDialog({ open, onClose, folderId }: AddPasswordDialogProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { addPassword } = useVaultStore();
  const { toast } = useToast();

  const handleSave = () => {
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Missing fields",
        description: "Please provide username and password",
        variant: "destructive",
      });
      return;
    }

    const derivedTitle = url.trim() || username.trim() || 'Password';

    addPassword(derivedTitle, username, password, url, folderId);
    toast({
      title: "Password saved",
      description: "Your credentials have been stored securely",
    });
    setUsername('');
    setPassword('');
    setUrl('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Password</DialogTitle>
          <DialogDescription>
            Add a new password to this folder
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="password-username">Username / Email</Label>
            <Input
              id="password-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username or email..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-password">Password</Label>
            <div className="relative">
              <Input
                id="password-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-xs text-muted-foreground hover:text-foreground"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-url">Website URL (Optional)</Label>
            <Input
              id="password-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Password
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
