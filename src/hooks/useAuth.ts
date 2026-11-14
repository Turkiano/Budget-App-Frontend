import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clearToken, setToken } from '@/api/authToken';
import { queryKeys } from '@/api/queryKeys';
import * as usersApi from '@/api/users';

export function useAuth() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: usersApi.login,
    onSuccess: (data) => {
      setToken(data.token);
      void queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });

  const signUp = useMutation({
    mutationFn: usersApi.signUp,
  });

  const logout = useCallback(() => {
    clearToken();
    queryClient.clear();
  }, [queryClient]);

  return {
    login,
    signUp,
    logout,
    isAuthenticating: login.isPending || signUp.isPending,
  };
}
