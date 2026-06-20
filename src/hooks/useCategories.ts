import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/api/api';


export function useCategories() {
const queryClient = useQueryClient();

const categoriesQuery = useQuery({
    queryKey: ['transactionCategories'],
    queryfn: async () => {
        const res = await api.get('/categorys');
        return res.data;
    },
});



const deleteCategory = useMutation({
    mutationFn: async (id: number) => {
        await api.delete(`/categories/${id}`);
    },
    onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey: ['transactionCategories'],
        });
    },
});


const updateCategory = useMutation({
    mutationFn: async ({id, name,}: {id:number, name: string}) => {
        await api.put(`/categories/${id}`, {  name });
    },
    onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey: ['transactionCategories'],

        });

},
});

return {
    categories: categoriesQuery.data ?? [],
    isLoading: categoriesQuery.isLoading,
    deleteCategory,
    updateCategory,
  };


}