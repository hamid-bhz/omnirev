import type {DateRangePreset} from '@/types/dashboard';

interface DashboardFiltersProps {
  endDate: string;
  markets: string[];
  startDate: string;
  selectedMarket: string;
  isLoadingMarkets: boolean;
  activeFilter: DateRangePreset;
  onEndDateChange: (date: string) => void;
  onMarketChange: (market: string) => void;
  onStartDateChange: (date: string) => void;
  onFilterChange: (filter: DateRangePreset) => void;
}

export function DashboardFilters({
  endDate,
  markets,
  startDate,
  activeFilter,
  selectedMarket,
  isLoadingMarkets,
  onFilterChange,
  onMarketChange,
  onEndDateChange,
  onStartDateChange,
}: DashboardFiltersProps) {
  const filterButtons: {value: DateRangePreset; label: string}[] = [
    {value: 'yesterday', label: 'Yesterday'},
    {value: '7days', label: '7 Days'},
    {value: '30days', label: '30 Days'},
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {filterButtons.map(({value, label}) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === value
                ? 'border-green-600 bg-green-50 text-green-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}>
            {label}
          </button>
        ))}

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={e => {
              onStartDateChange(e.target.value);
              onFilterChange('custom');
            }}
            className="w-40 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
          />
          <span className="text-gray-400">→</span>
          <input
            type="date"
            value={endDate}
            onChange={e => {
              onEndDateChange(e.target.value);
              onFilterChange('custom');
            }}
            className="w-40 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
          />
        </div>
      </div>

      <select
        value={selectedMarket}
        onChange={e => onMarketChange(e.target.value)}
        disabled={isLoadingMarkets}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none disabled:opacity-50">
        <option value="all">All markets</option>
        {markets.map(market => (
          <option key={market} value={market}>
            {market}
          </option>
        ))}
      </select>
    </div>
  );
}
