import {useQuery} from '@tanstack/react-query';

import {dashboardService} from '@services';
import {transformCategoryStats, type ChartData} from '@utils';

export function useCategoryStats() {
  return useQuery({
    queryKey: ['categoryStats'],
    queryFn: dashboardService.getCategoryStats,
    select: (data): ChartData[] => transformCategoryStats(data),
  });
}
