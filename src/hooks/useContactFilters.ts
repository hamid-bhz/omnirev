import {useState, useCallback, useMemo} from 'react';
import type {
  ContactFilters,
  ContactStatus,
  ContactSource,
  ContactCategory,
} from '@types';

interface ContactFilterState {
  page: number;
  per_page: number;
  q: string;
  status: ContactStatus | '';
  source: ContactSource | '';
  category: ContactCategory | '';
  market: string;
  startDate: string;
  endDate: string;
}

const INITIAL_STATE: ContactFilterState = {
  page: 1,
  per_page: 10,
  q: '',
  status: '',
  source: '',
  category: '',
  market: 'all',
  startDate: '',
  endDate: '',
};

export function useContactFilters() {
  const [filters, setFilters] = useState<ContactFilterState>(INITIAL_STATE);

  const updateFilter = useCallback(
    <K extends keyof ContactFilterState>(
      key: K,
      value: ContactFilterState[K]
    ) => {
      setFilters(prev => ({
        ...prev,
        [key]: value,
        ...(key !== 'page' && key !== 'per_page' ? {page: 1} : {}),
      }));
    },
    []
  );

  const setPage = useCallback(
    (page: number) => updateFilter('page', page),
    [updateFilter]
  );

  const setPerPage = useCallback((perPage: number) => {
    setFilters(prev => ({
      ...prev,
      per_page: perPage,
      page: 1,
    }));
  }, []);

  const setSearchQuery = useCallback(
    (query: string) => updateFilter('q', query),
    [updateFilter]
  );

  const setStatus = useCallback(
    (status: ContactStatus | '') => updateFilter('status', status),
    [updateFilter]
  );

  const setSource = useCallback(
    (source: ContactSource | '') => updateFilter('source', source),
    [updateFilter]
  );

  const setCategory = useCallback(
    (category: ContactCategory | '') => updateFilter('category', category),
    [updateFilter]
  );

  const setMarket = useCallback(
    (market: string) => updateFilter('market', market),
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

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_STATE);
  }, []);

  const apiFilters: ContactFilters = useMemo(() => {
    const params: ContactFilters = {
      page: filters.page,
      per_page: filters.per_page,
    };

    if (filters.q) params.q = filters.q;
    if (filters.status) params.status = filters.status;
    if (filters.source) params.source = filters.source;
    if (filters.category) params.category = filters.category;
    if (filters.market && filters.market !== 'all')
      params.market = filters.market;
    if (filters.startDate) params.created_at_after = filters.startDate;
    if (filters.endDate) params.created_at_before = filters.endDate;

    return params;
  }, [filters]);

  return {
    filters,
    apiFilters,
    setPage,
    setPerPage,
    setSearchQuery,
    setStatus,
    setSource,
    setCategory,
    setMarket,
    setStartDate,
    setEndDate,
    clearFilters,
  };
}
