import { create } from 'zustand';
//import { persist, createJSONStorage } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

/*
// Updating Zustand store to include email -  to add a settings ⚙️ gear icon to the header of App.tsx which, when clicked, opens a dropdown (or modal/popover) that shows:

    // ✅ The user's email
    // 🚪 A Logout button
*/
interface AuthState {
  token: string | null;
  role: 'admin' | 'user' | null;
  email: string | null;
  hydrated: boolean;
  setAuth: (token: string, role: 'admin' | 'user', email: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      email: null,
      hydrated: false,
      setAuth: (token, role, email) => {
        set({ token, role, email });
      },
      clearAuth: () => {
        set({ token: null, role: null, email: null });
      },
    }),
    {
      name: 'auth-store',
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hydrated: true });
      },
    }
  )
);

/* interface AuthState {
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
); */
