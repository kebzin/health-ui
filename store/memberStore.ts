import { create } from "zustand";
import { searchMembersAction, Member } from "@/lib/actions/memberActions"; // Updated import

// Define the store's state and actions
interface MemberState {
  searchQuery: string;
  searchResults: Member[]; // Updated to Member[]
  isLoading: boolean;
  selectedMember: Member | null; // Updated to Member | null
  error: string | null;
  setSearchQuery: (query: string) => void;
  fetchMembers: () => Promise<void>; // Renamed from fetchPatents
  setSelectedMember: (member: Member | null) => void; // Renamed from setSelectedPatent
  clearSearchResults: () => void;
}

export const useMemberStore = create<MemberState>((set, get) => ({
  // Renamed from usePatentStore
  searchQuery: "",
  searchResults: [],
  isLoading: false,
  selectedMember: null, // Renamed from selectedPatent
  error: null,
  setSearchQuery: (query) =>
    set({ searchQuery: query, error: null, selectedMember: null }), // Clear selected member and error on new query
  fetchMembers: async () => {
    // Renamed from fetchPatents
    const query = get().searchQuery;
    if (!query.trim()) {
      set({ searchResults: [], isLoading: false, error: null });
      return;
    }
    set({ isLoading: true, error: null, selectedMember: null }); // Clear selected member
    try {
      const results = await searchMembersAction(query); // Updated to call searchMembersAction
      set({ searchResults: results, isLoading: false });
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred";
      console.error("Error fetching members:", errorMessage); // Updated log message
      set({ isLoading: false, error: errorMessage, searchResults: [] });
    }
  },
  setSelectedMember: (member) => set({ selectedMember: member }), // Renamed from setSelectedPatent
  clearSearchResults: () =>
    set({
      searchResults: [],
      searchQuery: "",
      selectedMember: null,
      error: null,
    }),
}));
