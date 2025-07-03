import { create } from 'zustand';
import { initialDashboardState, DashboardState } from '@/app/(root)/dashboard-data'; // Using initial state from data file

interface DashboardActions {
  setDateRange: (dateRange: { from: Date | undefined; to: Date | undefined }) => void;
  // Add other actions here as needed, e.g., for table interactions
}

// Define the store
export const useDashboardStore = create<DashboardState & DashboardActions>((set) => ({
  ...initialDashboardState, // Spread the initial state

  setDateRange: (dateRange) =>
    set((state) => ({
      selectedDateRange: dateRange
    })),

  // Example of another action if we had table state:
  // setTablePage: (page: number) => set(state => ({ tableState: { ...state.tableState, currentPage: page } })),
}));

// Optional: Persist store to localStorage (if needed)
// import { persist, createJSONStorage } from 'zustand/middleware';
// export const useDashboardStore = create(
//   persist<DashboardState & DashboardActions>(
//     (set, get) => ({
//       ...initialDashboardState,
//       setDateRange: (dateRange) => set({ selectedDateRange: dateRange }),
//     }),
//     {
//       name: 'dashboard-storage', // name of item in the storage (must be unique)
//       storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
//     }
//   )
// );
