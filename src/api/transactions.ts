import api from './api';
import type {
  TransactionCreateDto,
  TransactionReadDto,
} from '@/Types/api';

export async function getTransactions(
  limit = 0,
  offset = 0,
): Promise<TransactionReadDto[]> {
  const { data } = await api.get<TransactionReadDto[]>('/transcations', {
    params: { limit, offset },
  });
  return data;
}

export async function getTransaction(
  transactionId: string,
): Promise<TransactionReadDto> {
  const { data } = await api.get<TransactionReadDto>(
    `/transcations/${transactionId}`,
  );
  return data;
}

export async function createTransaction(
  payload: TransactionCreateDto,
): Promise<TransactionReadDto> {
  const { data } = await api.post<TransactionReadDto>('/transcations', payload);
  return data;
}

export async function updateTransaction(
  transactionId: string,
  payload: TransactionCreateDto,
): Promise<TransactionReadDto> {
  const { data } = await api.patch<TransactionReadDto>(
    `/transcations/${transactionId}`,
    payload,
  );
  return data;
}

export async function deleteTransaction(transactionId: string): Promise<void> {
  await api.delete(`/transcations/${transactionId}`);
}
