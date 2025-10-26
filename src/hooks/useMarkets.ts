import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '@constants';
import {dashboardService} from '@services';

export function useMarkets() {
  return useQuery({
    queryKey: QUERY_KEYS.markets(),
    queryFn: dashboardService.getMarkets,
  });
}
