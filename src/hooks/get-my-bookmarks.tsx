import { ThemesResponse } from '@/types/apiReturnTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBookmarks = async (page: number, pageSize: number) => {
  const response = await axios.get(
    `/api/theme/getbookmarks?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const useMyBookmarks = (page: number, pageSize: number) => {
  return useQuery<ThemesResponse>({
    queryKey: ['myBookmarks', page, pageSize],
    queryFn: () => fetchBookmarks(page, pageSize),
  });
};
