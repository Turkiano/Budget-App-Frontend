import api from './api';

export const updateCategory = async (id: number, categoryName: string) => {
  const response = await api.put(`/categories/${id}`, { categoryName });
  return response.data;
};

export const deleteCategory = async (id: number) => {
  await api.delete(`/categories/${id}`);
};
