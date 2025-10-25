export type ContactStatus = 'potential' | 'customer' | 'lapsed';
export type ContactSource = 'CRM' | 'Organic';
export type ContactCategory =
  | 'education'
  | 'art'
  | 'legal'
  | 'unknown'
  | 'financial';

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  market: string;
  status: ContactStatus;
  created_at: string;
  source: ContactSource;
  order_count: number;
  category: ContactCategory;
  total_order_amount: number;
}

export interface ContactsResponse {
  data: Contact[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ContactFilters {
  page?: number;
  per_page?: number;
  q?: string;
  source?: ContactSource;
  category?: ContactCategory;
  status?: ContactStatus;
  market?: string;
  created_at_before?: string;
  created_at_after?: string;
  sort_by?: 'total_order_amount' | 'created_at';
  sort_order?: 'asc' | 'desc';
}
