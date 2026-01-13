import { create } from 'zustand';
import { Folder, Note, Password, Document, Category } from '@/types';
import {
  getFolders,
  saveFolders,
  getNotes,
  saveNotes,
  getPasswords,
  savePasswords,
  getDocuments,
  saveDocuments,
  getActivatedCategories,
  saveActivatedCategories,
} from '@/lib/storage';

// Initialize data from storage once so we can derive initial activated categories
const initialFolders = getFolders();
const initialNotes = getNotes();
const initialPasswords = getPasswords();
const initialDocuments = getDocuments();
const storedActivatedCategories = getActivatedCategories();

// Ensure base categories with existing data are activated even if not stored yet
const derivedActivatedCategories: Category[] = [];
if (initialNotes.length > 0) derivedActivatedCategories.push('notes');
if (initialPasswords.length > 0) derivedActivatedCategories.push('passwords');
if (initialDocuments.length > 0) derivedActivatedCategories.push('documents');

const initialActivatedCategories: Category[] = Array.from(
  new Set([...(storedActivatedCategories || []), ...derivedActivatedCategories])
);

interface VaultState {
  folders: Folder[];
  notes: Note[];
  passwords: Password[];
  documents: Document[];
  selectedCategory: Category | null;
  selectedFolderId: string | null;
  activatedCategories: Category[];
  
  // Folder actions
  addFolder: (name: string, category: Category) => void;
  deleteFolder: (id: string) => void;
  
  // Note actions
  addNote: (title: string, content: string, folderId: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  
  // Password actions
  addPassword: (title: string, username: string, password: string, url: string, folderId: string) => void;
  updatePassword: (id: string, title: string, username: string, password: string, url: string) => void;
  deletePassword: (id: string) => void;
  
  // Document actions
  addDocument: (name: string, fileName: string, fileType: string, fileSize: number, fileData: string, folderId: string) => void;
  deleteDocument: (id: string) => void;
  
  // UI actions
  setSelectedCategory: (category: Category | null) => void;
  setSelectedFolder: (folderId: string | null) => void;
}

export const useVaultStore = create<VaultState>((set) => ({
  folders: initialFolders,
  notes: initialNotes,
  passwords: initialPasswords,
  documents: initialDocuments,
  selectedCategory: null,
  selectedFolderId: null,
  activatedCategories: initialActivatedCategories,
  
  addFolder: (name, category) => {
    const folder: Folder = {
      id: Date.now().toString(),
      name,
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => {
      const folders = [...state.folders, folder];
      saveFolders(folders);
      return { folders };
    });
  },
  
  deleteFolder: (id) => {
    set((state) => {
      const folders = state.folders.filter((f) => f.id !== id);
      const notes = state.notes.filter((n) => n.folderId !== id);
      const passwords = state.passwords.filter((p) => p.folderId !== id);
      const documents = state.documents.filter((d) => d.folderId !== id);
      
      saveFolders(folders);
      saveNotes(notes);
      savePasswords(passwords);
      saveDocuments(documents);
      
      return { folders, notes, passwords, documents };
    });
  },
  
  addNote: (title, content, folderId) => {
    const note: Note = {
      id: Date.now().toString(),
      title,
      content,
      folderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => {
      const notes = [...state.notes, note];
      saveNotes(notes);
      return { notes };
    });
  },
  
  updateNote: (id, title, content) => {
    set((state) => {
      const notes = state.notes.map((note) =>
        note.id === id
          ? { ...note, title, content, updatedAt: new Date().toISOString() }
          : note
      );
      saveNotes(notes);
      return { notes };
    });
  },
  
  deleteNote: (id) => {
    set((state) => {
      const notes = state.notes.filter((n) => n.id !== id);
      saveNotes(notes);
      return { notes };
    });
  },
  
  addPassword: (title, username, password, url, folderId) => {
    const passwordEntry: Password = {
      id: Date.now().toString(),
      title,
      username,
      password,
      url,
      folderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => {
      const passwords = [...state.passwords, passwordEntry];
      savePasswords(passwords);
      return { passwords };
    });
  },
  
  updatePassword: (id, title, username, password, url) => {
    set((state) => {
      const passwords = state.passwords.map((p) =>
        p.id === id
          ? { ...p, title, username, password, url, updatedAt: new Date().toISOString() }
          : p
      );
      savePasswords(passwords);
      return { passwords };
    });
  },
  
  deletePassword: (id) => {
    set((state) => {
      const passwords = state.passwords.filter((p) => p.id !== id);
      savePasswords(passwords);
      return { passwords };
    });
  },
  
  addDocument: (name, fileName, fileType, fileSize, fileData, folderId) => {
    const document: Document = {
      id: Date.now().toString(),
      name,
      fileName,
      fileType,
      fileSize,
      fileData,
      folderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => {
      const documents = [...state.documents, document];
      saveDocuments(documents);
      return { documents };
    });
  },
  
  deleteDocument: (id) => {
    set((state) => {
      const documents = state.documents.filter((d) => d.id !== id);
      saveDocuments(documents);
      return { documents };
    });
  },
  
  setSelectedCategory: (category) =>
    set((state) => {
      const newActivatedCategories =
        category && !state.activatedCategories.includes(category)
          ? [...state.activatedCategories, category]
          : state.activatedCategories;

      // Persist activated categories so they survive page refresh
      saveActivatedCategories(newActivatedCategories);

      return {
        selectedCategory: category,
        activatedCategories: newActivatedCategories,
      };
    }),
  setSelectedFolder: (folderId) => set({ selectedFolderId: folderId }),
}));
