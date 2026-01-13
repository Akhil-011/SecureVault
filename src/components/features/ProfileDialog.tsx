import { useState, useRef } from 'react';
import { User, Camera, Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
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
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Avatar must be less than 2MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    updateProfile({
      name: formData.name,
      bio: formData.bio,
      phone: formData.phone,
      location: formData.location,
      avatar: previewAvatar,
    });

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
      location: user?.location || '',
    });
    setPreviewAvatar(user?.avatar || '');
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Profile</DialogTitle>
          <DialogDescription>
            View and manage your personal information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-4 border-primary/20 flex items-center justify-center overflow-hidden">
                {previewAvatar ? (
                  <img
                    src={previewAvatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-primary" />
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg transition-all"
                >
                  <Camera className="w-5 h-5 text-primary-foreground" />
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {!isEditing && (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground">{user?.name}</h3>
                {user?.bio && (
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    {user.bio}
                  </p>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* Info Section */}
          {!isEditing ? (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-vault-dark/30 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">{user?.email}</p>
                  </div>
                </div>

                {user?.phone && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-vault-dark/30 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium text-foreground">{user.phone}</p>
                    </div>
                  </div>
                )}

                {user?.location && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-vault-dark/30 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{user.location}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 rounded-lg bg-vault-dark/30 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(user?.createdAt || '').toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={() => setIsEditing(true)} className="flex-1 gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Full Name *</Label>
                <Input
                  id="profile-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-bio">Bio</Label>
                <Textarea
                  id="profile-bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.bio.length}/200 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-phone">Phone</Label>
                <Input
                  id="profile-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-location">Location</Label>
                <Input
                  id="profile-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-email">Email Address</Label>
                <Input
                  id="profile-email"
                  value={user?.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
