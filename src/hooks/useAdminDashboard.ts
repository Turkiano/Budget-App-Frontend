import { useQuery } from '@tanstack/react-query';

import * as adminApi from '@/api/admin';
import { queryKeys } from '@/api/queryKeys';

export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.adminDashboard,
    queryFn: adminApi.getAdminDashboard,
    staleTime: 60_000,
  });
}
