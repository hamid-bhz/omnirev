// Authentication types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

export interface User {
  username: string;
  token: string;
}

// Contact types
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

// Filter types
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

// Dashboard types
export interface CategoryStats {
  [key: string]: string; // e.g., "art": "23%"
}

// Market types
export type Market = string;

// Category types
export type Category = string;

// API Error types
export interface ApiError {
  error: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

// Date range types
export type DateRangePreset = 'yesterday' | '7days' | '30days' | 'custom';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DashboardFilters {
  dateRange: DateRangePreset;
  customDateRange?: DateRange;
  market?: string;
}
