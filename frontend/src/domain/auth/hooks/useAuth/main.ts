import { useAuthStore } from '../../stores/authStore';

/**
 * @hook useAuth
 * @summary Provides an interface to the authentication state and actions.
 * @domain auth
 * @type state-hook
 * @category authentication
 * @returns An object with authentication state and methods.
 */
export const useAuth = () => {
  const state = useAuthStore((s) => ({
    user: s.user,
    token: s.token,
    isAuthenticated: s.isAuthenticated,
    isLoading: s.isLoading,
  }));

  const { login, logout, register } = useAuthStore((s) => ({
    login: s.login,
    logout: s.logout,
    register: s.register,
  }));

  return { ...state, login, logout, register };
};
