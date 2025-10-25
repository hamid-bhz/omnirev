export const API_BASE_URL = 'https://api-mock.omnirev.ai';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'omnirev_auth_token',
  USER: 'omnirev_user',
} as const;

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const DATE_RANGE_PRESETS = {
  YESTERDAY: 'yesterday',
  SEVEN_DAYS: '7days',
  THIRTY_DAYS: '30days',
  CUSTOM: 'custom',
} as const;

export const STATUS_OPTIONS = [
  {value: 'potential', label: 'Potential'},
  {value: 'customer', label: 'Customer'},
  {value: 'lapsed', label: 'Lapsed'},
] as const;

export const SOURCE_OPTIONS = [
  {value: 'CRM', label: 'CRM'},
  {value: 'Organic', label: 'Organic'},
] as const;

export const CATEGORY_OPTIONS = [
  {value: 'education', label: 'Education'},
  {value: 'art', label: 'Art'},
  {value: 'legal', label: 'Legal'},
  {value: 'financial', label: 'Financial'},
  {value: 'unknown', label: 'Unknown'},
] as const;
