export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  createdAt: string;
}

export interface Folder {
  id: string;
  name: string;
  category: 'notes' | 'passwords' | 'documents';
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Password {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileData: string; // Base64 encoded
  folderId: string;
  createdAt: string;
  updatedAt: string;
}

export type Category = 'notes' | 'passwords' | 'documents';
