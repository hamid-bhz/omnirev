import {useQuery} from '@tanstack/react-query';

import {dashboardService} from '@services';

export function useMarkets() {
  return useQuery({
    queryKey: ['markets'],
    queryFn: dashboardService.getMarkets,
  });
}
