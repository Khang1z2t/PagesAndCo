"use client";

import { create } from "zustand";

export type AuthModalView = "sign-in" | "register";

interface AuthStore {
  isLoginModalOpen: boolean;
  authModalView: AuthModalView;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  setAuthModalView: (view: AuthModalView) => void;
  closeLoginModal: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isLoginModalOpen: false,
  authModalView: "sign-in",
  openLoginModal: () => set({ isLoginModalOpen: true, authModalView: "sign-in" }),
  openRegisterModal: () => set({ isLoginModalOpen: true, authModalView: "register" }),
  setAuthModalView: (view) => set({ authModalView: view }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));
