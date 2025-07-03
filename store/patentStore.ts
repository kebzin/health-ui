import { create } from "zustand";
import { searchPatentsAction, Patent } from "@/app/actions/patentActions"; // Assuming alias @ is set up for app directory

// Define the store's state and actions
interface PatentState {
  searchQuery: string;
  searchResults: Patent[];
  isLoading: boolean;
  selectedPatent: Patent | null;
  error: string | null;
  setSearchQuery: (query: string) => void;
  fetchPatents: () => Promise<void>; // Changed to not take query directly, uses searchQuery from state
  setSelectedPatent: (patent: Patent | null) => void;
  clearSearchResults: () => void;
}

export const usePatentStore = create<PatentState>((set, get) => ({
  searchQuery: "",
  searchResults: [],
  isLoading: false,
  selectedPatent: null,
  error: null,
  setSearchQuery: (query) => set({ searchQuery: query, error: null }), // Clear error on new query
  fetchPatents: async () => {
    const query = get().searchQuery;
    if (!query.trim()) {
      set({ searchResults: [], isLoading: false, error: null });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const results = await searchPatentsAction(query);
      set({ searchResults: results, isLoading: false });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
      console.error("Error fetching patents:", errorMessage);
      set({ isLoading: false, error: errorMessage, searchResults: [] });
    }
  },
  setSelectedPatent: (patent) => set({ selectedPatent: patent }),
  clearSearchResults: () => set({ searchResults: [], searchQuery: "", selectedPatent: null, error: null }),
}));
