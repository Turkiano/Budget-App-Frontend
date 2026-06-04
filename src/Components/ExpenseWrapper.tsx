import api from '@/api/api';
import { Form } from './Form';
import { type ChangeEvent } from 'react';
import { useForm, type Path } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserTypes } from '@/Types/User';
import { CategoryRecord } from '@/Types/ApiTypes';
import { TRANSACTION_TYPES, TransactionFormValues } from '@/Types/Transaction';

const TransactionSchema = z.object({
  date: z.string().min(1),
  amount: z.string().min(1),
  description: z.string().min(3),
  transcation_type: z.enum(['Incomes', 'Expenses', 'Saving'] as const),
  categoryName: z.string().min(1),
});

export type TransactionFormType = TransactionFormValues;

const INPUTS: Array<{
  name: Path<TransactionFormType>;
  id: string;
  placeholder: string;
}> = [
  { name: 'description', id: 'description', placeholder: 'Description' },
  { name: 'amount', id: 'amount', placeholder: 'Amount of Expense' },
];

const TRANSACTION_TYPE_OPTIONS = TRANSACTION_TYPES;
const CATEGORY_FALLBACK_OPTIONS = ['Food', 'Rent', 'Urgency'];

export type ExpenseWrapperProps = {
  expenses?: unknown[];
  setState?: (key: unknown[]) => void;
  handleDelete?: (key: string) => void;
  user: UserTypes;
};

export function ExpenseWrapper(props: ExpenseWrapperProps) {
  const today = new Date().toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      date: today,
      amount: '0',
      description: '',
      transcation_type: 'Expenses',
      categoryName: CATEGORY_FALLBACK_OPTIONS[0],
    },
  });

  const { data: categories = [] } = useQuery<CategoryRecord[]>({
    queryKey: ['transactionCategories'],
    queryFn: async () => {
      const res = await api.get('/categorys');
      return res.data as CategoryRecord[];
    },
  });

  const categoryOptions =
    categories.length > 0
      ? Array.from(
          new Set(
            categories
              .map((category) => category.Name || category.name)
              .filter(Boolean) as string[],
          ),
        )
      : CATEGORY_FALLBACK_OPTIONS;

  const resolveCategoryId = (categoryName: string) => {
    const match = categories.find(
      (category) =>
        category.Name === categoryName || category.name === categoryName,
    );
    return (
      match?.Category_id ||
      match?.category_id ||
      match?.CategoryId ||
      match?.categoryId
    );
  };

  const handleChangeDate = (_e: ChangeEvent<HTMLInputElement>) => undefined;

  const onSubmit = (data: TransactionFormType) => {
    const createTransaction = async () => {
      try {
        const categoryId = resolveCategoryId(data.categoryName);
        const fallbackId =
          categories?.[0]?.Category_id ||
          categories?.[0]?.category_id ||
          categories?.[0]?.CategoryId ||
          categories?.[0]?.categoryId;

        const payload = {
          date: data.date || today,
          amount: Number(data.amount),
          description: data.description,
          transcation_type: data.transcation_type,
          categoryId: categoryId || fallbackId,
          groupId: categoryId || fallbackId,
        };

        await api.post('/transcations', payload);
      } catch (err) {
        console.error('Create expense failed', err);
      }
    };

    void createTransaction();
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 shadow-2xl shadow-slate-950/40">
      <Form
        handleChangeDate={() => null}
        register={register}
        handleSubmit={handleSubmit}
        inputs={INPUTS}
        selects={[
          {
            name: 'transcation_type',
            id: 'transcation_type',
            label: 'Transaction Type',
            options: TRANSACTION_TYPE_OPTIONS,
          },
          {
            name: 'categoryName',
            id: 'categoryName',
            label: 'Category Name',
            options: categoryOptions,
          },
        ]}
        onSubmit={onSubmit}
        buttonLabel="Add Expense"
        titleLabel="Transaction Input"
      />
      {errors.description && (
        <p className="mt-3 text-sm text-rose-400">
          Description: {errors.description.message}
        </p>
      )}
      {errors.amount && (
        <p className="mt-2 text-sm text-rose-400">
          Amount: {errors.amount.message}
        </p>
      )}
    </div>
  );
}
