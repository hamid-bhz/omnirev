import type {ContactFilters} from '@types';

export const QUERY_KEYS = {
  // Contact-related queries
  contacts: (filters?: ContactFilters) => ['contacts', filters] as const,
  contact: (id: string) => ['contact', id] as const,

  // Dashboard-related queries
  categoryStats: () => ['category-stats'] as const,
  highValueCustomers: (filters?: ContactFilters) =>
    ['high-value-customers', filters] as const,

  // Market and category queries
  markets: () => ['markets'] as const,
  categories: () => ['categories'] as const,
} as const;

export type QueryKey = ReturnType<(typeof QUERY_KEYS)[keyof typeof QUERY_KEYS]>;
