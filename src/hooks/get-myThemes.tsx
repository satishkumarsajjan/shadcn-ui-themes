import { Theme, ThemesResponse } from '@/types/apiReturnTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMyThemes = async (page: number, pageSize: number) => {
  const response = await axios.get(
    `/api/theme/getMythemes?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const useMyThemes = (page: number, pageSize: number) => {
  return useQuery<ThemesResponse>({
    queryKey: ['myThemes', page, pageSize],
    queryFn: () => fetchMyThemes(page, pageSize),
  });
};
