import { Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="relative">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
          <Shield className="w-16 h-16 text-primary" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <Plus className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="text-center space-y-2 max-w-md">
        <h2 className="text-2xl font-bold text-foreground">Your Vault is Empty</h2>
        <p className="text-muted-foreground text-base">
          Get started by creating your first category. Store notes, passwords, or documents securely.
        </p>
      </div>

      <Button size="lg" onClick={onAddClick} className="gap-2 shadow-lg">
        <Plus className="w-5 h-5" />
        Create Category
      </Button>
    </div>
  );
}
