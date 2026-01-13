import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/authStore';
import { useState } from 'react';
import ProfileDialog from '@/components/features/ProfileDialog';

export default function Header() {
  const { user, logout } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="border-b border-border/50 bg-vault/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="w-full px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <img
                src="https://ik.imagekit.io/b45loridy/vault%20logo.jpg"
                alt="SecureVault logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">SecureVault</h1>
              <p className="text-xs text-muted-foreground">Personal Storage</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="default" className="gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-primary" />
                  )}
                </div>
                <span className="hidden sm:inline text-sm font-semibold">
                  {user?.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">{user?.name}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {user?.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowProfile(true)}>
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <ProfileDialog open={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
}
