import { FileText, Key, FileBox, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Category } from '@/types';
import { useVaultStore } from '@/stores/vaultStore';

interface HomePageProps {
  onCategorySelect: (category: Category) => void;
  onAddClick?: () => void;
}

const categoryConfig = {
  notes: {
    icon: FileText,
    label: 'Notes',
    description: 'Write and organize your notes',
    color: 'blue',
  },
  passwords: {
    icon: Key,
    label: 'Passwords',
    description: 'Store your credentials securely',
    color: 'amber',
  },
  documents: {
    icon: FileBox,
    label: 'Documents',
    description: 'Upload and manage your files',
    color: 'emerald',
  },
};

export default function HomePage({ onCategorySelect, onAddClick }: HomePageProps) {
  const { activatedCategories, notes, passwords, documents } = useVaultStore();

  const getCategoryCount = (category: Category) => {
    switch (category) {
      case 'notes':
        return notes.length;
      case 'passwords':
        return passwords.length;
      case 'documents':
        return documents.length;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <div className="text-center space-y-3">
        <div className="flex justify-center mb-4">
          <img
            src="https://ik.imagekit.io/b45loridy/vault%20logo.jpg"
            alt="SecureVault logo"
            className="h-20 w-auto object-contain"
          />
        </div>
        <h2 className="text-3xl font-bold text-foreground">SecureVault</h2>
        <p className="text-muted-foreground text-base max-w-md">
          Your personal digital storage for notes, passwords, and documents
        </p>
      </div>

      {activatedCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {activatedCategories.map((category) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];

            // Fallback card for custom categories that don't exist in categoryConfig
            if (!config) {
              const label = category.charAt(0).toUpperCase() + category.slice(1);

              return (
                <Card
                  key={category}
                  className="p-6 vault-card border hover:border-primary/40 transition-all cursor-pointer group"
                  onClick={() => onCategorySelect(category)}
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-7 h-7 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Custom category</p>
                    </div>
                  </div>
                </Card>
              );
            }

            const Icon = config.icon;
            const count = getCategoryCount(category as Category);
            
            return (
              <Card
                key={category}
                className="p-6 vault-card border hover:border-primary/40 transition-all cursor-pointer group"
                onClick={() => onCategorySelect(category)}
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl bg-${config.color}-500/10 border border-${config.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 text-${config.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{config.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {count} {count === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        onAddClick && (
          <div className="flex justify-center">
            <Button size="lg" onClick={onAddClick} className="gap-2 shadow-lg">
              <Plus className="w-5 h-5" />
              Create Category
            </Button>
          </div>
        )
      )}
    </div>
  );
}
