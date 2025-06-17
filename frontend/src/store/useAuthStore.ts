// store/authStore.ts
// Sync Zustand store with localStorage (persist across reloads)
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  role: 'admin' | 'user' | null;
  setAuth: (token: string, role: 'admin' | 'user') => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role') as 'admin' | 'user' | null,
  setAuth: (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    set({ token, role });
  },
  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    set({ token: null, role: null });
  },
}));
