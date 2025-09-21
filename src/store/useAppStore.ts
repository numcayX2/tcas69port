"use client";

import { create } from "zustand";

type Theme = "light" | "dark";

type AppState = {
  count: number;
  theme: Theme;
  increment: () => void;
  toggleTheme: () => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  theme: "light",
  increment: () => set((s) => ({ count: s.count + 1 })),
  toggleTheme: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
  reset: () => set({ count: 0, theme: "light" }),
}));

