import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { authService } from '../services/authService';
import type { AuthState, AuthActions, LoginCredentials, RegisterCredentials } from '../types';

/**
 * @store useAuthStore
 * @summary Manages authentication state including user, token, and loading status.
 * @domain auth
 * @type domain-store
 * @category authentication
 */
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    immer((set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true, // Start with true to check for existing session

      // Actions
      login: async (credentials: LoginCredentials) => {
        const { token, user } = await authService.login(credentials);
        set((state) => {
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
        });
        return user;
      },

      register: async (credentials: RegisterCredentials) => {
        const { token, user } = await authService.register(credentials);
        set((state) => {
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
        });
        return user;
      },

      logout: () => {
        set((state) => {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        });
      },

      checkAuth: () => {
        // This is called on app load to set initial state from persisted storage
        const token = get().token;
        if (token) {
          set((state) => {
            state.isAuthenticated = true;
          });
        }
        set((state) => {
          state.isLoading = false;
        });
      },
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.checkAuth();
        }
      },
    }
  )
);

// Initial check for authentication status when the app loads
useAuthStore.getState().checkAuth();
