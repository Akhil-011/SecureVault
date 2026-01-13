import { useState, useEffect } from 'react';
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
import { Password } from '@/types';
import { useVaultStore } from '@/stores/vaultStore';
import { useToast } from '@/hooks/use-toast';

interface EditPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  password: Password;
}

export default function EditPasswordDialog({ open, onClose, password }: EditPasswordDialogProps) {
  const [title, setTitle] = useState(password.title);
  const [username, setUsername] = useState(password.username);
  const [passwordValue, setPasswordValue] = useState(password.password);
  const [url, setUrl] = useState(password.url || '');
  const { updatePassword } = useVaultStore();
  const { toast } = useToast();

  useEffect(() => {
    setTitle(password.title);
    setUsername(password.username);
    setPasswordValue(password.password);
    setUrl(password.url || '');
  }, [password]);

  const handleSave = () => {
    if (!title.trim() || !username.trim() || !passwordValue.trim()) {
      toast({
        title: "Missing fields",
        description: "Please provide title, username, and password",
        variant: "destructive",
      });
      return;
    }

    updatePassword(password.id, title, username, passwordValue, url);
    toast({
      title: "Password updated",
      description: "Your changes have been saved",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Password</DialogTitle>
          <DialogDescription>
            Update your stored credentials
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-password-title">Title</Label>
            <Input
              id="edit-password-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Gmail, Facebook..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-password-username">Username / Email</Label>
            <Input
              id="edit-password-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username or email..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-password-password">Password</Label>
            <Input
              id="edit-password-password"
              type="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="Enter password..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-password-url">Website URL (Optional)</Label>
            <Input
              id="edit-password-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
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
