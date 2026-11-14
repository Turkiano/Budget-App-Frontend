import api from './api';
import type { CategoryCreateDto, CategoryReadDto } from '@/Types/api';

export async function getCategories(
  limit = 0,
  offset = 0,
): Promise<CategoryReadDto[]> {
  const { data } = await api.get<CategoryReadDto[]>('/categorys', {
    params: { limit, offset },
  });
  return data;
}

export async function getCategory(categoryId: string): Promise<CategoryReadDto> {
  const { data } = await api.get<CategoryReadDto>(`/categorys/${categoryId}`);
  return data;
}

export async function createCategory(
  payload: CategoryCreateDto,
): Promise<CategoryReadDto> {
  const { data } = await api.post<CategoryReadDto>('/categorys', payload);
  return data;
}

export async function updateCategory(
  categoryId: string,
  payload: CategoryCreateDto,
): Promise<CategoryReadDto> {
  const { data } = await api.patch<CategoryReadDto>(
    `/categorys/${categoryId}`,
    payload,
  );
  return data;
}

export async function deleteCategory(categoryId: string): Promise<void> {
  await api.delete(`/categorys/${categoryId}`);
}
