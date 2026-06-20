import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/api/api';
import { CategoryRecord } from '@/Types/ApiTypes';

export function useCategories() {
    
    const queryClient = useQueryClient();

const categoriesQuery = useQuery<CategoryRecord[]>({
  queryKey: ['transactionCategories'],
  queryFn: async () => {
    const res = await api.get('/categorys');
    return res.data as CategoryRecord[];
  },
});



const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
        await api.delete(`/categorys/${id}`);
    },
    onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey: ['transactionCategories'],
        });
    },
});


const updateCategory = useMutation({
    mutationFn: async ({id, name,}: {id:string, name: string}) => {
        await api.patch(`/categorys/${id}`, {  name });
    },
    onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey: ['transactionCategories'],

        });

},
});

return {
  categories: (categoriesQuery.data ?? []) as CategoryRecord[],
  isLoading: categoriesQuery.isLoading,
  deleteCategory,
  updateCategory,
};


}