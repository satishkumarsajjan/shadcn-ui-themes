import { useQuery } from '@tanstack/react-query';
import { SortOption, TimeframeOption } from './useThemeFilter';
import { ThemesResponse } from '@/types/apiReturnTypes';

interface ThemesParams {
  page: number;
  pageSize: number;
  sortBy?: SortOption;
  timeframe?: TimeframeOption;
}

// This is a placeholder for your actual API call
const fetchThemes = async ({
  page,
  pageSize,
  sortBy,
  timeframe,
}: ThemesParams) => {
  // Construct your API URL with the filter parameters
  const url = new URL('/api/theme/getthemes', window.location.origin);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('pageSize', pageSize.toString());

  if (sortBy) {
    url.searchParams.append('sortBy', sortBy);
  }

  if (timeframe) {
    url.searchParams.append('timeframe', timeframe);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch themes');
  }

  return response.json();
};

export function useThemes({ page, pageSize, sortBy, timeframe }: ThemesParams) {
  return useQuery<ThemesResponse>({
    queryKey: ['themes', { page, pageSize, sortBy, timeframe }],
    queryFn: () => fetchThemes({ page, pageSize, sortBy, timeframe }),
  });
}
