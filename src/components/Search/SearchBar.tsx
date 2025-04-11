'use client';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';

// Define the type for search results
type SearchResult = {
  id: string;
  name: string;
};

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]); // Add type for results
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/theme/search?query=${value}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: SearchResult[] = await res.json(); // Ensure data matches the expected type
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]); // Reset results on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommandDialog>
      <CommandInput
        placeholder='Type a command or search...'
        value={query}
        onValueChange={(value: string) => handleSearch(value)} // Use onValueChange if CommandInput expects it
      />
      <CommandList>
        {loading && <CommandEmpty>Loading...</CommandEmpty>}
        {!loading && results.length === 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {results.map((result) => (
          <CommandItem key={result.id}>
            <span>{result.name}</span>
          </CommandItem>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
