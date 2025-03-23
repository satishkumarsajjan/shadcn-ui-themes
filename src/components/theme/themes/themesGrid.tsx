'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ThemesResponse } from '@/types/apiReturnTypes';
import { Dispatch, SetStateAction } from 'react';
import { ThemeCard } from '../theme-card/theme-card';
import { ThemeCardSkeleton } from '../theme-card/theme-card-skeleton';
interface ThemesGridProps {
  data: ThemesResponse | undefined;
  isFetching: boolean;
  error: globalThis.Error | null;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
}
const ThemesGrid = ({
  data,
  isFetching,
  error,
  page,
  setPage,
  pageSize,
}: ThemesGridProps) => {
  //   const [page, setPage] = useState(1);
  //   const pageSize = 9;
  // const { data, isFetching, error } = useMyThemes(page, pageSize);

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 1;

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className='p-4'>
      {isFetching && (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8'>
          {[0, 1, 2, 3, 4, 5]?.map((item) => (
            <div key={item}>
              <ThemeCardSkeleton />
            </div>
          ))}
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
        {data?.themes.map((item) => (
          <div key={item.id}>
            <ThemeCard theme={item} />
          </div>
        ))}
      </div>
      {isFetching ? (
        <div className='w-full mt-4 flex justify-center items-center'>
          <Skeleton className='w-[500px] h-10' />
        </div>
      ) : (
        <Pagination className='mt-4'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                className={cn(
                  'cursor-pointer',
                  page === 1 &&
                    'text-muted-foreground hover:cursor-not-allowed hover:text-muted-foreground'
                )}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => setPage(index + 1)}
                  className={cn(
                    'cursor-pointer',
                    page === index + 1 && 'bg-primary text-primary-foreground'
                  )}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={cn(
                  'cursor-pointer',
                  page === totalPages &&
                    'text-muted-foreground hover:cursor-not-allowed hover:text-muted-foreground'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ThemesGrid;
