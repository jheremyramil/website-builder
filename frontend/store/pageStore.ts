import { create } from "zustand";

type Page = { id: number; name: string; slug: string };

type PageStore = {
  pages: Page[];
  currentPage: number;
  totalPages: number;
  setPages: (pages: Page[], currentPage: number, totalPages: number) => void;
  addPage: (page: Page) => void;
};

export const usePageStore = create<PageStore>((set) => ({
  pages: [],
  currentPage: 1,
  totalPages: 0,
  setPages: (pages, currentPage, totalPages) =>
    set({ pages, currentPage, totalPages }),
  addPage: (page) => set((state) => ({ pages: [...state.pages, page] })),
}));
