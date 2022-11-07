import create from "zustand";

interface VodSearch {
  search: string;
  setSearch: (newSearch: string) => void;
}

export const useVodSearch = create<VodSearch>((set) => ({
  search: "",
  setSearch: (newSearch) => set(() => ({ search: newSearch })),
}));
