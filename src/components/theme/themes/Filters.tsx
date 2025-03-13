import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SortOption,
  TimeframeOption,
  useThemeFiltersStore,
} from '@/hooks/useThemeFilter';

export const SortBy = () => {
  const { sortBy, setSortBy } = useThemeFiltersStore();

  return (
    <div className='flex items-center space-x-2'>
      <label
        htmlFor='sort-by'
        className='text-sm font-medium hidden md:block w-full'
      >
        Sort-by:
      </label>
      <Select
        value={sortBy}
        onValueChange={(value) => setSortBy(value as SortOption)}
      >
        <SelectTrigger className='max-w-[180px]' id='sort-by'>
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='newest'>Newest</SelectItem>
          <SelectItem value='oldest'>Oldest</SelectItem>
          <SelectItem value='popular'>Most Popular</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const FilterByTimeframe = () => {
  const { timeframe, setTimeframe } = useThemeFiltersStore();

  return (
    <div className='flex items-center space-x-2'>
      <label
        htmlFor='timeframe'
        className='text-sm font-medium hidden md:block'
      >
        Timeframe:
      </label>
      <Select
        value={timeframe}
        onValueChange={(value) => setTimeframe(value as TimeframeOption)}
      >
        <SelectTrigger className='max-w-[180px]' id='timeframe'>
          <SelectValue placeholder='Timeframe' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Time</SelectItem>
          <SelectItem value='today'>Today</SelectItem>
          <SelectItem value='week'>This Week</SelectItem>
          <SelectItem value='month'>This Month</SelectItem>
          <SelectItem value='year'>This Year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
