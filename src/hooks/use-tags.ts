
import { ThemeTagWithDetails } from '@/types/apiReturnTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useTags = (themeId: string) => {
  return useQuery<ThemeTagWithDetails[]>({queryKey:  ['tags', themeId], queryFn: async () => {
    const { data } = await axios.get(`/api/theme/tags?themeId=${themeId}`);
    return data;},  refetchOnWindowFocus: false,

  });
};
