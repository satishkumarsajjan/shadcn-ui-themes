'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryClientProviderProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

const ClientQueryProvider = ({ children }: QueryClientProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ClientQueryProvider;
