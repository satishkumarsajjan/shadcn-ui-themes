import { Theme } from '@/types/apiReturnTypes';
import { useQuery } from '@tanstack/react-query';
const fetchMyThemes = async () => {
  const response = await fetch('/api/theme/getMythemes');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};
export const useMyThemes = () => {
  return useQuery<Theme[]>({ queryKey: ['myThemes'], queryFn: fetchMyThemes });
};
