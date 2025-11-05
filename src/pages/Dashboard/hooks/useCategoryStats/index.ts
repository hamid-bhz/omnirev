import {useQuery} from '@tanstack/react-query';

import {dashboardService} from '@/services';
import type {ChartData} from '@/types/chart';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {transformCategoryStats} from '@/helpers/chartData';

export function useCategoryStats() {
  return useQuery({
    queryKey: QUERY_KEYS.categoryStats(),
    queryFn: dashboardService.getCategoryStats,
    select: (data): ChartData[] => transformCategoryStats(data),
  });
}
