import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category } from '@/types';
import { useVaultStore } from '@/stores/vaultStore';
import Header from '@/components/layout/Header';
import HomePage from '@/components/features/HomePage';
import CategorySelector from '@/components/features/CategorySelector';
import NotesView from '@/components/features/notes/NotesView';
import PasswordsView from '@/components/features/passwords/PasswordsView';
import DocumentsView from '@/components/features/documents/DocumentsView';

export default function VaultPage() {
  const { selectedCategory, setSelectedCategory } = useVaultStore();
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [showCustomOption, setShowCustomOption] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setShowCategorySelector(false);
  };

  const handleAddClick = () => {
    setShowCustomOption(true);
    setShowCategorySelector(true);
  };

  const handleHomeAddClick = () => {
    setShowCustomOption(false);
    setShowCategorySelector(true);
  };

  return (
    <div className="min-h-screen bg-vault-gradient flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl flex-1 flex">
        <div className="w-full flex flex-col">
          {!selectedCategory ? (
            <HomePage
              onCategorySelect={handleCategorySelect}
              onAddClick={handleHomeAddClick}
            />
          ) : (
            <>
              {selectedCategory === 'notes' && <NotesView />}
              {selectedCategory === 'passwords' && <PasswordsView />}
              {selectedCategory === 'documents' && <DocumentsView />}

              {selectedCategory !== 'notes' &&
                selectedCategory !== 'passwords' &&
                selectedCategory !== 'documents' && (
                  <div className="flex flex-1 flex-col items-center justify-center py-16 space-y-4">
                    <p className="text-lg font-semibold text-foreground text-center">
                      This custom category doesn&apos;t have its own view yet.
                    </p>
                    <p className="text-sm text-muted-foreground text-center max-w-md">
                      You can still store content using the built-in Notes, Passwords, and
                      Documents categories.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedCategory(null)}
                      className="mt-2"
                    >
                      Back to Home
                    </Button>
                  </div>
                )}
            </>
          )}
        </div>
      </main>

      {/* Floating Action Button - Only visible on home page */}
      {!selectedCategory && (
        <Button
          size="lg"
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl shadow-primary/30"
          onClick={handleAddClick}
        >
          <Plus className="w-6 h-6" />
        </Button>
      )}

      {/* Category Selector Dialog */}
      <CategorySelector
        open={showCategorySelector}
        onClose={() => setShowCategorySelector(false)}
        onSelect={handleCategorySelect}
        showCustomOption={showCustomOption}
      />
    </div>
  );
}
