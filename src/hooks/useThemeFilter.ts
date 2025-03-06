import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the types for our filter state
export type SortOption = 'newest' | 'oldest' | 'popular';
export type TimeframeOption = 'all' | 'today' | 'week' | 'month' | 'year';

// Define the store state interface
interface ThemeFiltersState {
  // Filter state
  sortBy: SortOption;
  timeframe: TimeframeOption;

  // Actions to update the state
  setSortBy: (sort: SortOption) => void;
  setTimeframe: (timeframe: TimeframeOption) => void;
  resetFilters: () => void;
}

// Create the store with persistence
export const useThemeFiltersStore = create<ThemeFiltersState>()(
  persist(
    (set) => ({
      // Default values
      sortBy: 'newest',
      timeframe: 'all',

      // Actions
      setSortBy: (sortBy) => set({ sortBy }),
      setTimeframe: (timeframe) => set({ timeframe }),
      resetFilters: () => set({ sortBy: 'newest', timeframe: 'all' }),
    }),
    {
      name: 'theme-filters-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
