export type ThemeSortBy = 'newest' | 'oldest' | 'popular' | 'alphabetical';
export type ThemeTimeframe = 'all' | 'today' | 'week' | 'month' | 'year';

export interface ThemeFilters {
  sortBy?: ThemeSortBy;
  timeframe?: ThemeTimeframe;
  page: number;
  pageSize: number;
}

// Default filter values
export const defaultFilters: ThemeFilters = {
  sortBy: 'newest',
  timeframe: 'all',
  page: 1,
  pageSize: 9,
};
