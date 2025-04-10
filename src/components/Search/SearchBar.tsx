import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '../ui/button';

export const SearchBar = ({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className='flex items-center gap-2'>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search by tags...'
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};
