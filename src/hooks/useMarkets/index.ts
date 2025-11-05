import {useQuery} from '@tanstack/react-query';

import {dashboardService} from '@/services';
import {QUERY_KEYS} from '@/constants/queryKeys';

export function useMarkets() {
  return useQuery({
    queryKey: QUERY_KEYS.markets(),
    queryFn: dashboardService.getMarkets,
  });
}
