export interface CategoryStats {
  [key: string]: string; // e.g., "art": "23%"
}

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
