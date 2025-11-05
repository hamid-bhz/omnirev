import type {ContactFilters} from '@/types/contact';
import type {DateRangePreset} from '@/types/dashboard';

interface DateFilterOptions {
  dateFilter: DateRangePreset;
  startDate?: string;
  endDate?: string;
}

export function buildDateRangeFilters({
  dateFilter,
  startDate,
  endDate,
}: DateFilterOptions): Pick<
  ContactFilters,
  'created_at_after' | 'created_at_before'
> {
  const now = new Date();
  const filters: Pick<
    ContactFilters,
    'created_at_after' | 'created_at_before'
  > = {};

  switch (dateFilter) {
    case 'yesterday': {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      filters.created_at_after = yesterday.toISOString().split('T')[0];
      filters.created_at_before = now.toISOString().split('T')[0];
      break;
    }
    case '7days': {
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filters.created_at_after = sevenDaysAgo.toISOString().split('T')[0];
      filters.created_at_before = now.toISOString().split('T')[0];
      break;
    }
    case '30days': {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filters.created_at_after = thirtyDaysAgo.toISOString().split('T')[0];
      filters.created_at_before = now.toISOString().split('T')[0];
      break;
    }
    case 'custom': {
      if (startDate && endDate) {
        filters.created_at_after = startDate;
        filters.created_at_before = endDate;
      }
      break;
    }
  }

  return filters;
}
