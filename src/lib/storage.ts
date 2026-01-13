import { User, Folder, Note, Password, Document, Category } from '@/types';

const STORAGE_KEYS = {
  USER: 'vault_user',
  FOLDERS: 'vault_folders',
  NOTES: 'vault_notes',
  PASSWORDS: 'vault_passwords',
  DOCUMENTS: 'vault_documents',
  ACTIVATED_CATEGORIES: 'vault_activated_categories',
};

// User Storage
export const saveUser = (user: User) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Folder Storage
export const saveFolders = (folders: Folder[]) => {
  localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
};

export const getFolders = (): Folder[] => {
  const data = localStorage.getItem(STORAGE_KEYS.FOLDERS);
  return data ? JSON.parse(data) : [];
};

// Notes Storage
export const saveNotes = (notes: Note[]) => {
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
};

export const getNotes = (): Note[] => {
  const data = localStorage.getItem(STORAGE_KEYS.NOTES);
  return data ? JSON.parse(data) : [];
};

// Passwords Storage
export const savePasswords = (passwords: Password[]) => {
  localStorage.setItem(STORAGE_KEYS.PASSWORDS, JSON.stringify(passwords));
};

export const getPasswords = (): Password[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PASSWORDS);
  return data ? JSON.parse(data) : [];
};

// Documents Storage
export const saveDocuments = (documents: Document[]) => {
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
};

export const getDocuments = (): Document[] => {
  const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
  return data ? JSON.parse(data) : [];
};

// Activated Categories Storage
export const saveActivatedCategories = (categories: Category[]) => {
  localStorage.setItem(STORAGE_KEYS.ACTIVATED_CATEGORIES, JSON.stringify(categories));
};

export const getActivatedCategories = (): Category[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ACTIVATED_CATEGORIES);
  return data ? JSON.parse(data) : [];
};
