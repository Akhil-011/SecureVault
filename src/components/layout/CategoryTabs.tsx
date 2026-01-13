import { FileText, Key, FileBox } from 'lucide-react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { useVaultStore } from '@/stores/vaultStore';

interface CategoryTabsProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const allCategories: { id: Category; label: string; icon: typeof FileText }[] = [
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'passwords', label: 'Passwords', icon: Key },
  { id: 'documents', label: 'Documents', icon: FileBox },
];

export default function CategoryTabs({ selectedCategory, onCategoryChange }: CategoryTabsProps) {
  const { activatedCategories } = useVaultStore();
  
  // Only show categories that have been activated
  const categories = allCategories.filter((cat) => activatedCategories.includes(cat.id));
  return (
    <div className="border-b border-border/50 bg-vault-dark/30 backdrop-blur-sm sticky top-16 z-30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex gap-1">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onCategoryChange(id)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all relative',
                selectedCategory === id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              {selectedCategory === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
