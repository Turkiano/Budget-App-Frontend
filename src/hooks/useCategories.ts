import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as categoriesApi from '@/api/categories';
import { queryKeys } from '@/api/queryKeys';
import { CategoryRecord } from '@/Types/ApiTypes';
import type { BudgetType, CategoryReadDto } from '@/Types/api';

type CategoryInput = {
  name: string;
  category_type: BudgetType;
  group_id?: string;
};

const toRecord = (category: CategoryReadDto): CategoryRecord => ({
  category_id: category.category_id,
  name: category.name ?? '',
  category_type: category.category_type ?? '',
  group_id: category.group_id ?? '',
});

export function useCategories() {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery<CategoryReadDto[]>({
    queryKey: queryKeys.transactionCategories,
    queryFn: () => categoriesApi.getCategories(),
  });

  const invalidateCategories = () => {
    void queryClient.invalidateQueries({
      queryKey: queryKeys.transactionCategories,
    });
  };

  const deleteCategory = useMutation({
    mutationFn: categoriesApi.deleteCategory,
    onSuccess: invalidateCategories,
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      categoriesApi.updateCategory(id, { name }),
    onSuccess: invalidateCategories,
  });

  const createCategory = useMutation({
    mutationFn: (payload: CategoryInput) =>
      categoriesApi.createCategory(payload),
    onSuccess: invalidateCategories,
  });

  return {
    categories: (categoriesQuery.data ?? []).map(toRecord),
    isLoading: categoriesQuery.isLoading,
    error: categoriesQuery.error,
    createCategory,
    deleteCategory,
    updateCategory,
  };
}
