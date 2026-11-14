/**
 * Shared React Query keys. The transaction key keeps the existing misspelled
 * `transcations` route/caching name so current consumers keep working.
 */
export const queryKeys = {
  currentUser: ['currentUser'] as const,
  groups: ['groups'] as const,
  categories: ['categories'] as const,
  transactionCategories: ['transactionCategories'] as const,
  transactions: ['transcations'] as const,
  adminDashboard: ['adminDashboard'] as const,
};
