import { ThemesResponse } from '@/types/apiReturnTypes';
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
    refetchOnWindowFocus: false,
  });
};

const fetchUserThemes = async (userId: string, page: number, pageSize: number) => {
  const response = await axios.get(
    `/api/theme/getuserthemesbyid?userId=${userId}&page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const useUserThemes = (userId: string, page: number, pageSize: number) => {
  return useQuery<ThemesResponse>({
    queryKey: ['userThemes', userId, page, pageSize],
    queryFn: () => fetchUserThemes(userId, page, pageSize),
    enabled: !!userId, // Only run the query if userId is provided
    refetchOnWindowFocus: false,
  });
};
