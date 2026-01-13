import { useState } from 'react';
import { FileText, Key, FileBox, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Category } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (category: Category) => void;
  showCustomOption?: boolean;
}

const categories = [
  {
    id: 'notes' as Category,
    label: 'Notes',
    description: 'Quick notes and ideas',
    icon: FileText,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 'passwords' as Category,
    label: 'Passwords',
    description: 'Secure credential storage',
    icon: Key,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    id: 'documents' as Category,
    label: 'Documents',
    description: 'Files and attachments',
    icon: FileBox,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
];

export default function CategorySelector({ open, onClose, onSelect, showCustomOption = false }: CategorySelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const handleCustomSubmit = () => {
    if (customCategory.trim()) {
      onSelect(customCategory.trim().toLowerCase() as Category);
      setCustomCategory('');
      setShowCustomInput(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Select Category</DialogTitle>
          <DialogDescription>
            Choose what type of content you want to store
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {categories.map(({ id, label, description, icon: Icon, color, bgColor, borderColor }) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg border transition-all hover:scale-[1.02]',
                bgColor,
                borderColor,
                'hover:shadow-lg'
              )}
            >
              <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', bgColor, borderColor, 'border')}>
                <Icon className={cn('w-6 h-6', color)} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">{label}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </button>
          ))}

          {/* Custom Category Option - Only shown when showCustomOption is true */}
          {showCustomOption && (
            !showCustomInput ? (
              <button
                onClick={() => setShowCustomInput(true)}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg border transition-all hover:scale-[1.02]',
                  'bg-purple-500/10',
                  'border-purple-500/20',
                  'hover:shadow-lg'
                )}
              >
                <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', 'bg-purple-500/10', 'border-purple-500/20', 'border')}>
                  <Plus className={cn('w-6 h-6', 'text-purple-400')} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground">Custom Category</h3>
                  <p className="text-sm text-muted-foreground">Create your own category</p>
                </div>
              </button>
            ) : (
              <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="custom-category">Category Name</Label>
                  <Input
                    id="custom-category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter category name..."
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                    autoFocus
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCustomSubmit} size="sm" className="flex-1">
                    Create
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomCategory('');
                    }} 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
