import api from './api';
import type {
  AuthResponse,
  UserCreateDto,
  UserLoginDto,
  UserReadDto,
  UserUpdateDto,
} from '@/Types/api';

export async function signUp(payload: UserCreateDto): Promise<UserReadDto> {
  const { data } = await api.post<UserReadDto>('/users/signup', payload);
  return data;
}

export async function login(payload: UserLoginDto): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/users/login', payload);
  return data;
}

export async function getCurrentUser(): Promise<UserReadDto> {
  const { data } = await api.get<UserReadDto>('/users/me');
  return data;
}

export async function getUsers(
  limit = 0,
  offset = 0,
): Promise<UserReadDto[]> {
  const { data } = await api.get<UserReadDto[]>('/users', {
    params: { limit, offset },
  });
  return data;
}

export async function getUserById(userId: string): Promise<UserReadDto> {
  const { data } = await api.get<UserReadDto>(
    `/users/${encodeURIComponent(userId)}`,
  );
  return data;
}

export async function getUserByEmail(email: string): Promise<UserReadDto> {
  const { data } = await api.get<UserReadDto>('/users/email', {
    params: { email },
  });
  return data;
}

export async function updateUser(
  email: string,
  payload: UserUpdateDto,
): Promise<UserReadDto> {
  const { data } = await api.patch<UserReadDto>(
    `/users/${encodeURIComponent(email)}`,
    payload,
  );
  return data;
}

export async function deleteUser(userId: string): Promise<void> {
  await api.delete(`/users/${encodeURIComponent(userId)}`);
}
