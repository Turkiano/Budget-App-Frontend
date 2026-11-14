import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKeys';
import * as transactionsApi from '@/api/transactions';

export function useTransactions() {
  const queryClient = useQueryClient();

  const transactionsQuery = useQuery({
    queryKey: queryKeys.transactions,
    queryFn: () => transactionsApi.getTransactions(),
  });

  const invalidateTransactions = () => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
  };

  const createTransaction = useMutation({
    mutationFn: transactionsApi.createTransaction,
    onSuccess: invalidateTransactions,
  });

  const deleteTransaction = useMutation({
    mutationFn: transactionsApi.deleteTransaction,
    onSuccess: invalidateTransactions,
  });

  return {
    transactions: transactionsQuery.data ?? [],
    isLoading: transactionsQuery.isLoading,
    error: transactionsQuery.error,
    createTransaction,
    deleteTransaction,
  };
}
