import { isAxiosError } from 'axios';
import type { ProblemDetails } from '@/Types/api';

export type ApiError = {
  status: number | null;
  title: string;
  message: string;
  detail?: string;
  traceId?: string;
  fieldErrors: Record<string, string[]>;
  isNetworkError: boolean;
};

const STATUS_FALLBACKS: Record<number, string> = {
  400: 'Please check the submitted values.',
  401: 'Your session has expired. Please log in again.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested item was not found.',
  409: 'That item already exists.',
  500: 'The server could not complete the request. Please try again.',
};

function isProblemDetails(value: unknown): value is ProblemDetails {
  if (typeof value !== 'object' || value === null) return false;

  return (
    'title' in value ||
    'detail' in value ||
    'status' in value ||
    'errors' in value
  );
}

/**
 * Normalises every failure into the RFC 7807 fields the API now returns.
 * Components render `message`; forms can additionally map `fieldErrors`.
 */
export function getApiError(error: unknown): ApiError {
  if (!isAxiosError(error)) {
    return {
      status: null,
      title: 'Unexpected error',
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      fieldErrors: {},
      isNetworkError: false,
    };
  }

  const status = error.response?.status ?? null;
  const data = error.response?.data;
  const problem = isProblemDetails(data) ? data : null;
  const fieldErrors = problem?.errors ?? {};
  const isNetworkError = !error.response;

  if (isNetworkError) {
    const message =
      error.code === 'ECONNABORTED'
        ? 'The API took too long to respond. Please try again.'
        : 'Cannot reach the API. Check your connection and try again.';

    return {
      status,
      title: 'Network error',
      message,
      fieldErrors,
      isNetworkError,
    };
  }

  const fallback = status ? STATUS_FALLBACKS[status] : undefined;
  const hasFieldErrors = Object.keys(fieldErrors).length > 0;

  const message =
    problem?.detail ??
    (hasFieldErrors
      ? 'Please check the submitted values.'
      : problem?.title ?? fallback ?? 'Something went wrong. Please try again.');

  return {
    status,
    title: problem?.title ?? fallback ?? 'Request failed',
    message,
    detail: problem?.detail,
    traceId: problem?.traceId,
    fieldErrors,
    isNetworkError: false,
  };
}

export function getApiErrorMessage(error: unknown): string {
  return getApiError(error).message;
}
