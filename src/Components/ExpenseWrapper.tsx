import { useEffect, useState } from 'react';
import api from '@/api/api';
import { Form } from './Form';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryRecord } from '@/Types/ApiTypes';
import {
  TRANSACTION_TYPES,
  TransactionCreatePayload,
  TransactionFormValues,
  TransactionType,
} from '@/Types/Transaction';

const TransactionSchema = z.object({
  date: z.string().min(1),
  amount: z.string().min(1),
  description: z.string().min(3),
  transcation_type: z.enum(['Incomes', 'Expenses', 'Saving'] as const),
  categoryName: z.string().min(1),
});

export type TransactionFormType = TransactionFormValues;

const CATEGORY_FALLBACK_OPTIONS = ['Food', 'Rent', 'Urgency'];

export function ExpenseWrapper() {
  const today = new Date().toISOString().slice(0, 10);
  const [transactionTypeOptions, setTransactionTypeOptions] =
    useState<string[]>(TRANSACTION_TYPES);
  // const [categoryOptions, setCategoryOptions] = useState<string[]>(
  //   CATEGORY_FALLBACK_OPTIONS,
  // );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  // useEffect(() => {
  //   if (categories.length > 0) {
  //     const names = Array.from(
  //       new Set(
  //         categories
  //           .map((category) => category.Name || category.name)
  //           .filter(Boolean) as string[],
  //       ),
  //     );
  //     if (names.length > 0) {
  //       setCategoryOptions(names);
  //     }
  //   }
  // }, [categories]);

  const selectedType = watch('transcation_type');
  const selectedCategory = watch('categoryName');

  const categoryOptions =
    categories
      .filter((c) => c.category_type === selectedType)
      .map((c) => c.name) || CATEGORY_FALLBACK_OPTIONS;

  useEffect(() => {
    if (
      categoryOptions.length > 0 &&
      !categoryOptions.includes(selectedCategory)
    ) {
      setValue('categoryName', categoryOptions[0]);
    }
  }, [selectedType, selectedCategory, categoryOptions, setValue]);

  const resolveCategoryId = (categoryName: string) =>
    categories.find((category) => category.name === categoryName)?.category_id;

  const handleDeleteOption = (fieldName: string, option: string) => {
    if (fieldName === 'transcation_type') {
      const next = transactionTypeOptions.filter((value) => value !== option);
      const final = next.length > 0 ? next : TRANSACTION_TYPES;
      setTransactionTypeOptions(final);
      if (selectedType === option) {
        setValue('transcation_type', final[0] as TransactionType);
      }
    }
  };

  const handleEditOptions = (fieldName: string) => {
    if (fieldName === 'transcation_type') {
      const newType = window.prompt('Add a new transaction type')?.trim();
      if (!newType) return;
      setTransactionTypeOptions((prev) =>
        Array.from(new Set([...prev, newType])),
      );
    }
  };

  const onSubmit = (data: TransactionFormType) => {
    const createTransaction = async () => {
      try {
        const rawCategoryId = resolveCategoryId(data.categoryName);
        const fallbackId =
          categories?.[0]?.category_id ||
          categories?.[0]?.category_id ||
          categories?.[0]?.category_id ||
          categories?.[0]?.category_id ||
          '';
        const categoryId = String(rawCategoryId || fallbackId);

        const payload: TransactionCreatePayload = {
          date: new Date(data.date).toISOString(),
          amount: Number(data.amount),
          description: data.description,
          transcation_type: data.transcation_type,
          categoryId,
          groupId: categoryId,
        };

        await api.post('/transcations', payload);
      } catch (err) {
        console.error('Create expense failed', err);
      }
    };

    void createTransaction();
  };

  const fields = [
    {
      type: 'select',
      name: 'transcation_type',
      id: 'transcation_type',
      label: 'Transaction Type',
      options: transactionTypeOptions,
    } as const,
    {
      type: 'select',
      name: 'categoryName',
      id: 'categoryName',
      label: 'Category',
      options: categoryOptions,
    } as const,
    { type: 'date', name: 'date', id: 'date', label: 'Date' } as const,
    {
      type: 'input',
      name: 'amount',
      id: 'amount',
      placeholder: 'Amount',
      inputType: 'number',
    } as const,
    {
      type: 'input',
      name: 'description',
      id: 'description',
      placeholder: 'Description',
    } as const,
  ];

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 shadow-2xl shadow-slate-950/40">
      <Form
        register={register}
        setValue={setValue}
        watch={watch}
        handleSubmit={handleSubmit}
        fields={fields}
        onSubmit={onSubmit}
        buttonLabel="Add Transaction"
        titleLabel="Transaction Input"
        onDeleteOption={handleDeleteOption}
        onEditOptions={handleEditOptions}
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
