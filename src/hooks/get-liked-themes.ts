import { ThemesResponse } from '@/types/apiReturnTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchLikedThemes = async (page: number, pageSize: number) => {
  const response = await axios.get(
    `/api/theme/getlikedthemes?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const useLikedThemes = (page: number, pageSize: number) => {
  return useQuery<ThemesResponse>({
    queryKey: ['likedThemes', page, pageSize],
    queryFn: () => fetchLikedThemes(page, pageSize),
    refetchOnWindowFocus: false,
  });
};
