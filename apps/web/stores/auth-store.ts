import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { logoutAction, getSession } from "@/lib/auth-actions";

// Types
export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  image?: string | null;
  emailVerified?: boolean;
}

interface AuthState {
  // State
  user: User | null;
  isLoading: boolean;
  isHydrated: boolean;

  // Actions
  setUser: (
    user: User | null | ((prevUser: User | null) => User | null),
  ) => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setHydrated: (hydrated: boolean) => void;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoading: true,
      isHydrated: false,

      // Setters
      setUser: (userOrUpdater) => {
        if (typeof userOrUpdater === "function") {
          const currentUser = get().user;
          set({ user: userOrUpdater(currentUser) });
        } else {
          set({ user: userOrUpdater });
        }
      },
      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },
      setLoading: (isLoading) => set({ isLoading }),
      setHydrated: (isHydrated) => set({ isHydrated }),

      // Logout action
      logout: async () => {
        await logoutAction();
        set({ user: null });
      },

      // Initialize auth from session
      initAuth: async () => {
        set({ isLoading: true });

        try {
          const session = await getSession();

          if (session?.user) {
            set({ user: session.user });
          } else {
            set({ user: null });
          }
        } catch (error) {
          console.error("Auth initialization failed:", error);
          set({ user: null });
        } finally {
          set({ isLoading: false, isHydrated: true });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist user data, not loading states
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    },
  ),
);

// Selector hooks for better performance
export const useUser = () => useAuthStore((state) => state.user);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.user !== null);

// For backwards compatibility with useAuth hook pattern
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const logout = useAuthStore((state) => state.logout);

  return { user, isLoading, logout };
};
