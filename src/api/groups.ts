import api from './api';
import type { GroupCreateDto, GroupReadDto } from '@/Types/api';

export async function getGroups(
  limit = 0,
  offset = 0,
): Promise<GroupReadDto[]> {
  const { data } = await api.get<GroupReadDto[]>('/groups', {
    params: { limit, offset },
  });
  return data;
}

export async function getGroup(groupId: string): Promise<GroupReadDto> {
  const { data } = await api.get<GroupReadDto>(`/groups/${groupId}`);
  return data;
}

export async function createGroup(
  payload: GroupCreateDto,
): Promise<GroupReadDto> {
  const { data } = await api.post<GroupReadDto>('/groups', payload);
  return data;
}

export async function updateGroup(
  groupId: string,
  payload: GroupCreateDto,
): Promise<GroupReadDto> {
  const { data } = await api.patch<GroupReadDto>(
    `/groups/${groupId}`,
    payload,
  );
  return data;
}

export async function deleteGroup(groupId: string): Promise<void> {
  await api.delete(`/groups/${groupId}`);
}
