import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  role: 'admin' | 'user' | null;
  setAuth: (token: string, role: 'admin' | 'user') => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  // Apply the persist middleware to save state to localStorage
  persist(
    (set) => ({
      token: null,
      role: null,
      setAuth: (token, role) => set({ token, role }),
      clearAuth: () => set({ token: null, role: null }),
    }),
    {
      // Unique name for the key in localStorage
      name: 'auth-storage',
      // Specify localStorage as the storage mechanism
      storage: createJSONStorage(() => localStorage),
      // Optional: You can choose to only persist specific parts of the state
      // For example, if you only want to persist the token:
      // partialize: (state) => ({ token: state.token }),
    }
  )
);
