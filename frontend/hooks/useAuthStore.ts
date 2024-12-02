import { create } from "zustand";

interface AuthState {
  user: Record<string, any> | null;
  token: string | null;
  setAuth: (user: Record<string, any>, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set(() => ({ user, token })),
  clearAuth: () => set(() => ({ user: null, token: null })),
}));
