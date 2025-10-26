import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '@constants';
import {dashboardService} from '@services';
import {transformCategoryStats, type ChartData} from '@utils';

export function useCategoryStats() {
  return useQuery({
    queryKey: QUERY_KEYS.categoryStats(),
    queryFn: dashboardService.getCategoryStats,
    select: (data): ChartData[] => transformCategoryStats(data),
  });
}
