/**
 * Canonical client types mirrored from docs/API_CONTRACT.md.
 *
 * Field names intentionally match the API JSON exactly, including the frozen
 * `transcation_*` spelling and the lower-cased `user_id` / `group_id`.
 */

export type BudgetType = 'Incomes' | 'Expenses' | 'Savings';

export type ProblemDetails = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  traceId?: string;
  errors?: Record<string, string[]>;
};

export type UserCreateDto = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export type UserLoginDto = {
  email: string;
  password: string;
};

export type UserUpdateDto = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
};

export type UserReadDto = {
  user_id: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  role: string | null;
};

export type AuthResponse = {
  token: string;
};

export type GroupCreateDto = {
  group_id?: string | null;
  name?: string | null;
};

export type GroupReadDto = {
  group_id: string | null;
  name: string | null;
  created_at: string;
};

export type CategoryCreateDto = {
  category_id?: string;
  name?: string | null;
  category_type?: BudgetType | null;
  group_id?: string | null;
};

export type CategoryReadDto = {
  category_id: string;
  name: string | null;
  category_type: BudgetType | null;
  group_id: string | null;
};

export type TransactionCreateDto = {
  date?: string;
  amount?: number;
  description?: string | null;
  transcation_type?: BudgetType;
  categoryId: string;
  groupId?: string | null;
};

export type TransactionReadDto = {
  transcation_Id: string;
  date: string;
  amount: number;
  description: string | null;
  transcation_type: BudgetType;
  userId: string;
  groupId: string | null;
  categoryId: string;
};
