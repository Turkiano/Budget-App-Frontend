import { useQuery } from '@tanstack/react-query';

import { getToken, isTokenValid } from '@/api/authToken';
import { queryKeys } from '@/api/queryKeys';
import { getCurrentUser } from '@/api/users';
import type { UserReadDto } from '@/Types/api';

export function useCurrentUser() {
  return useQuery<UserReadDto>({
    queryKey: queryKeys.currentUser,
    queryFn: getCurrentUser,
    enabled: isTokenValid(getToken()),
    retry: false,
    staleTime: 60_000,
  });
}
