import { create } from 'zustand';
import { User } from '@/types';
import { saveUser, getUser, removeUser } from '@/lib/storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'name' | 'avatar' | 'bio' | 'phone' | 'location'>>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getUser(),
  isAuthenticated: !!getUser(),
  
  login: async (email: string, password: string) => {
    // Mock login - in V1.0 we accept any credentials
    const user: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    saveUser(user);
    set({ user, isAuthenticated: true });
    return true;
  },
  
  signup: async (email: string, password: string, name: string) => {
    // Mock signup
    const user: User = {
      id: '1',
      email,
      name,
      createdAt: new Date().toISOString(),
    };
    saveUser(user);
    set({ user, isAuthenticated: true });
    return true;
  },
  
  logout: () => {
    removeUser();
    set({ user: null, isAuthenticated: false });
  },
  
  updateProfile: (data: Partial<Pick<User, 'name' | 'avatar' | 'bio' | 'phone' | 'location'>>) => {
    set((state) => {
      if (state.user) {
        const updatedUser = { ...state.user, ...data };
        saveUser(updatedUser);
        return { user: updatedUser };
      }
      return state;
    });
  },
}));
