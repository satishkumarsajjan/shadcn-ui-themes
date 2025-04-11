'use client';
import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useThemeSearch } from '@/hooks/useThemeSearch';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  // Use the theme search hook
  const {
    data: themes,
    isLoading,
    isError,
    error,
  } = useThemeSearch({
    query: debouncedQuery,
    page: 1,
    pageSize: 10,
  });

  // Handle keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        variant='outline'
        className={cn(
          'relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64'
        )}
        onClick={() => setOpen(true)}
      >
        <span className='hidden lg:inline-flex'>Search Themes...</span>
        <span className='inline-flex lg:hidden'>Search...</span>
        <kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Type a command or search...'
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
          {isError && (
            <CommandEmpty className='text-red-500'>
              Error: {error?.message || 'An error occurred during search'}
            </CommandEmpty>
          )}
          {!isLoading &&
            !isError &&
            debouncedQuery &&
            (!themes || themes.length === 0) && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          {themes?.map((theme) => (
            <CommandItem
              key={theme.id}
              onSelect={() => {
                const url = `${
                  process.env.NEXT_PUBLIC_BASE_URL || ''
                }/theme/id/${theme.id}`;
                window.location.href = url;
                setOpen(false);
              }}
            >
              {theme.title}
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
