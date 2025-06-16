// store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  role: 'admin' | 'user' | null;
  setAuth: (token: string, role: 'admin' | 'user') => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  setAuth: (token, role) => set({ token, role }),
  clearAuth: () => set({ token: null, role: null }),
}));
