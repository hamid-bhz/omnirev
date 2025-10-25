import {useState, useCallback, useMemo} from 'react';

import {buildDateRangeFilters} from '@utils';
import type {ContactFilters, DateRangePreset} from '@types';

interface DashboardFilterState {
  endDate: string;
  startDate: string;
  selectedMarket: string;
  activeFilter: DateRangePreset;
}

const getInitialState = (): DashboardFilterState => {
  const today = new Date();

  return {
    activeFilter: '30days',
    selectedMarket: 'all',
    startDate: today.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
  };
};

const INITIAL_STATE: DashboardFilterState = getInitialState();

export function useDashboardFilters() {
  const [filters, setFilters] = useState<DashboardFilterState>(INITIAL_STATE);

  const updateFilter = useCallback(
    <K extends keyof DashboardFilterState>(
      key: K,
      value: DashboardFilterState[K]
    ) => {
      setFilters(prev => ({...prev, [key]: value}));
    },
    []
  );

  const setActiveFilter = useCallback(
    (filter: DateRangePreset) => updateFilter('activeFilter', filter),
    [updateFilter]
  );

  const setStartDate = useCallback(
    (date: string) => updateFilter('startDate', date),
    [updateFilter]
  );

  const setEndDate = useCallback(
    (date: string) => updateFilter('endDate', date),
    [updateFilter]
  );

  const setSelectedMarket = useCallback(
    (market: string) => updateFilter('selectedMarket', market),
    [updateFilter]
  );

  const contactFilters: ContactFilters = useMemo(() => {
    const apiFilters: ContactFilters = {
      sort_by: 'total_order_amount',
      sort_order: 'desc',
      per_page: 10,
      ...buildDateRangeFilters({
        dateFilter: filters.activeFilter,
        startDate: filters.startDate,
        endDate: filters.endDate,
      }),
    };

    if (filters.selectedMarket && filters.selectedMarket !== 'all') {
      apiFilters.market = filters.selectedMarket;
    }

    return apiFilters;
  }, [
    filters.endDate,
    filters.startDate,
    filters.activeFilter,
    filters.selectedMarket,
  ]);

  return {
    filters,
    contactFilters,
    setEndDate,
    setStartDate,
    setActiveFilter,
    setSelectedMarket,
  };
}
