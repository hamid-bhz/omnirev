import type {ContactFilters} from '@/types/contact';

export const QUERY_KEYS = {
  contacts: (filters?: ContactFilters) => ['contacts', filters] as const,
  contact: (id: string) => ['contact', id] as const,
  categoryStats: () => ['category-stats'] as const,
  highValueCustomers: (filters?: ContactFilters) =>
    ['high-value-customers', filters] as const,
  markets: () => ['markets'] as const,
  categories: () => ['categories'] as const,
} as const;

export type QueryKey = ReturnType<(typeof QUERY_KEYS)[keyof typeof QUERY_KEYS]>;
