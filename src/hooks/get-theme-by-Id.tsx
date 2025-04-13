import { GetThemeByIdResponse } from '@/types/apiReturnTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTheme = async (themeId: string) => {
  const response = await axios.get(
    `/api/theme/getthemebyId?themeId=${themeId}`
  );
  return response.data;
};

export const useThemeById = (themeId: string) => {
  return useQuery<GetThemeByIdResponse>({
    queryKey: ['Theme', themeId],
    queryFn: () => fetchTheme(themeId),
    refetchOnWindowFocus: false,
  });
};
