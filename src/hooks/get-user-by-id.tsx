import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetUser(userId: string) {
  const fetchUser = async (): Promise<User> => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const response = await axios.get(`/api/user/getUser?userId=${userId}`);
    return response.data.user; // Return the user data
  };

  return useQuery({
    queryKey: ['user', userId], // Unique query key
    queryFn: fetchUser, // Fetch function
    enabled: !!userId, // Only run the query if userId is provided
    retry: 1, // Retry once on failure
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function useGetUserInfo(userId: string) {
  const fetchUser = async (): Promise<User> => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const response = await axios.get(`/api/user/getUserinfo?userId=${userId}`);
    return response.data.user; // Return the user data
  };

  return useQuery({
    queryKey: ['userInfo', userId], // Unique query key
    queryFn: fetchUser, // Fetch function
    enabled: !!userId, // Only run the query if userId is provided
    retry: 1, // Retry once on failure
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false,
  });
}
