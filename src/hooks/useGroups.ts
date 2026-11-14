import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as groupsApi from '@/api/groups';
import { queryKeys } from '@/api/queryKeys';

export function useGroups() {
  const queryClient = useQueryClient();

  const groupsQuery = useQuery({
    queryKey: queryKeys.groups,
    queryFn: () => groupsApi.getGroups(),
  });

  const createGroup = useMutation({
    mutationFn: groupsApi.createGroup,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.groups });
    },
  });

  return {
    groups: groupsQuery.data ?? [],
    isLoading: groupsQuery.isLoading,
    error: groupsQuery.error,
    createGroup,
  };
}
