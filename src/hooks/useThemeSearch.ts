import { useQuery } from '@tanstack/react-query';
import { ThemeSearchResults } from '@/types/apiReturnTypes';

interface SearchThemesParams {
  query: string;
  page?: number;
  pageSize?: number;
}

/**
 * Fetches themes based on search parameters
 */
const fetchThemes = async ({ query, page = 1, pageSize = 10 }: SearchThemesParams): Promise<ThemeSearchResults> => {
  const params = new URLSearchParams();
  params.append('query', query);
  params.append('page', page.toString());
  params.append('pageSize', pageSize.toString());

  const response = await fetch(`/api/theme/search?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch themes');
  }
  
  return response.json();
};

/**
 * Hook for searching themes with Tanstack Query
 */
export function useThemeSearch({ query, page = 1, pageSize = 10 }: SearchThemesParams) {
  return useQuery<ThemeSearchResults, Error>({
    queryKey: ['themes', 'search', query, page, pageSize],
    queryFn: () => fetchThemes({ query, page, pageSize }),
    enabled: query.length > 0, // Only run the query if there's a search term
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}