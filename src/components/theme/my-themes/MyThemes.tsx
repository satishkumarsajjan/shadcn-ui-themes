'use client';

import { useState } from 'react';
import { useMyThemes } from '@/hooks/get-myThemes';
import { Button } from '@/components/ui/button';
import { ThemeCard } from '../theme-card/theme-card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { ThemeCardSkeleton } from '../theme-card/theme-card-skeleton';

const MyThemes = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isFetching, error } = useMyThemes(page, pageSize);

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
            <PaginationItem>
              <PaginationLink
                key={index + 1}
                onClick={() => setPage(index + 1)}
                className={cn(
                  'cursor-pointer',
                  page === index + 1 && 'bg-cyan-500 text-white'
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
    </div>
  );
};

export default MyThemes;
