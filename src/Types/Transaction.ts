export type TransactionType = 'Incomes' | 'Expenses' | 'Savings';

export const TRANSACTION_TYPES: TransactionType[] = [
  'Incomes',
  'Expenses',
  'Savings',
];

export type TransactionFormValues = {
  date: string;
  amount: string;
  description: string;
  transcation_type: TransactionType;
  categoryName: string;
};

export type TransactionCreatePayload = {
  date: string;
  amount: number;
  description: string;
  transcation_type: TransactionType;
  categoryId: string;
  groupId: string;
};

export type TransactionWrapperProps = {
  defaultType: TransactionType;
  title?: string;
  buttonLabel?: string;
};
