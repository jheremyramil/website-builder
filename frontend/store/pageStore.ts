// In your store file
import { create } from "zustand";

interface PageStore {
  pages: any[];
  currentPage: number;
  totalPages: number;
  setPages: (pages: any[], currentPage: number, totalPages: number) => void;
  setCurrentPage: (page: number) => void;
}

export const usePageStore = create<PageStore>((set) => ({
  pages: [],
  currentPage: 1,
  totalPages: 1,
  setPages: (pages, currentPage, totalPages) =>
    set({ pages, currentPage, totalPages }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
