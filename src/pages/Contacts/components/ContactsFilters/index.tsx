import {useState, useEffect} from 'react';

import {Icon} from '@/components';
import {useDebounce} from '@/hooks';
import type {
  ContactStatus,
  ContactSource,
  ContactCategory,
} from '@/types/contact';
import {
  STATUS_OPTIONS,
  SOURCE_OPTIONS,
  CATEGORY_OPTIONS,
} from '@/constants/options';

interface ContactsFiltersProps {
  searchQuery: string;
  status: ContactStatus | '';
  source: ContactSource | '';
  category: ContactCategory | '';
  market: string;
  startDate: string;
  endDate: string;
  markets: string[];
  isLoadingMarkets: boolean;
  onSearchChange: (query: string) => void;
  onStatusChange: (status: ContactStatus | '') => void;
  onSourceChange: (source: ContactSource | '') => void;
  onCategoryChange: (category: ContactCategory | '') => void;
  onMarketChange: (market: string) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onClearFilters: () => void;
}

export function ContactsFilters({
  searchQuery,
  status,
  source,
  category,
  market,
  startDate,
  endDate,
  markets,
  isLoadingMarkets,
  onSearchChange,
  onStatusChange,
  onSourceChange,
  onCategoryChange,
  onMarketChange,
  onStartDateChange,
  onEndDateChange,
  onClearFilters,
}: ContactsFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const hasActiveFilters =
    searchQuery ||
    status ||
    source ||
    category ||
    market !== 'all' ||
    startDate ||
    endDate;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon name="search" size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={localSearch}
          onChange={e => setLocalSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={e => onStatusChange(e.target.value as ContactStatus | '')}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none">
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Source
          </label>
          <select
            value={source}
            onChange={e => onSourceChange(e.target.value as ContactSource | '')}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none">
            <option value="">All Sources</option>
            {SOURCE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={e =>
              onCategoryChange(e.target.value as ContactCategory | '')
            }
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none">
            <option value="">All Categories</option>
            {CATEGORY_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Market
          </label>
          <select
            value={market}
            onChange={e => onMarketChange(e.target.value)}
            disabled={isLoadingMarkets}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none disabled:opacity-50">
            <option value="all">All Markets</option>
            {markets.map(mkt => (
              <option key={mkt} value={mkt}>
                {mkt}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={onClearFilters}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <span className="text-sm font-medium text-gray-700">Date Range:</span>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={e => onStartDateChange(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
          />
          <span className="text-gray-400">→</span>
          <input
            type="date"
            value={endDate}
            onChange={e => onEndDateChange(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
