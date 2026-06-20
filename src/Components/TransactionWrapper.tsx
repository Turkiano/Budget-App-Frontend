import { useEffect, useState } from 'react';
import api from '@/api/api';
import { Form } from './Form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TRANSACTION_TYPES,
  TransactionCreatePayload,
  TransactionFormValues,
  TransactionWrapperProps,
} from '@/Types/Transaction';


import { useCategories } from '@/hooks/useCategories';

const TransactionSchema = z.object({
  date: z.string().min(1),
  amount: z.string().min(1),
  description: z.string().min(3),
  transcation_type: z.enum(['Incomes', 'Expenses', 'Savings'] as const),
  categoryName: z.string().min(1),
});

export type TransactionFormType = TransactionFormValues;

const CATEGORY_FALLBACK_OPTIONS = ['Food', 'Rent', 'Urgency'];

export function TransactionWrapper({
  defaultType,
  buttonLabel,
}: TransactionWrapperProps) {
  const today = new Date().toISOString().slice(0, 10);
  const [transactionTypeOptions, setTransactionTypeOptions] =
    useState<string[]>(TRANSACTION_TYPES);

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
      transcation_type: defaultType,
      categoryName: CATEGORY_FALLBACK_OPTIONS[0],
    },
  });

  const { categories, deleteCategory, updateCategory } = useCategories();

  const selectedType = watch('transcation_type');
  const selectedCategory = watch('categoryName');

  const categoryOptions = categories
    .filter((c) => c.category_type === selectedType)
    .map((c) => c.name);

  const finalCategoryOptions =
    categoryOptions.length > 0 ? categoryOptions : CATEGORY_FALLBACK_OPTIONS;

  useEffect(() => {
    if (
      categoryOptions.length > 0 &&
      !categoryOptions.includes(selectedCategory)
    ) {
      setValue('categoryName', categoryOptions[0]);
    }
  }, [selectedType, selectedCategory, categoryOptions, setValue]);

  const resolveCategory = (categoryName: string) =>
    categories.find((category) => category.name === categoryName);

  const handleDeleteOption = (fieldName: string, option: string) => {
    if (fieldName !== 'categoryName') return;

    const category = categories.find((c) => c.name === option);

    if (!category) return;

    handleDeleteCategory(category.category_id);
  };

  const handleEditOptions = (fieldName: string, option: string) => {
    if (fieldName !== 'categoryName') return;

    const category = categories.find((c) => c.name === option);

    if (!category) return;

    handleEditCategory(category.category_id, category.name);
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory.mutate(id);
  };

  const handleEditCategory = (id: string, name: string) => {
    const newName = window.prompt('New Category Name', name);

    if (!newName?.trim()) return;

    updateCategory.mutate({
      id,
      name: newName.trim(),
    });
  };

  const onSubmit = (data: TransactionFormType) => {
    const createTransaction = async () => {
      try {
        const category = resolveCategory(data.categoryName);

        if (!category) {
          console.error('Category not found');
          return;
        }

        const payload: TransactionCreatePayload = {
          date: new Date(data.date).toISOString(),
          amount: Number(data.amount),
          description: data.description,
          transcation_type: data.transcation_type,
          categoryId: category.category_id,
          groupId: category.group_id ?? undefined,
        };

        console.log('Payload:', payload);

        const response = await api.post('/transcations', payload);

        console.log('Created:', response.data);
      } catch (err: any) {
        console.log('Status:', err.response?.status);
        console.log('Response:', err.response?.data);
        console.dir(err.response?.data, { depth: null });
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
      options: finalCategoryOptions,
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
    <div className="card-container">
      <Form
        register={register}
        setValue={setValue}
        watch={watch}
        handleSubmit={handleSubmit}
        fields={fields}
        onSubmit={onSubmit}
        buttonLabel={buttonLabel}
        titleLabel="Transaction Input"
        onDeleteOption={handleDeleteOption}
        onEditOptions={handleEditOptions}
      />

      {errors.description && (
        <p className="error-text-primary">
          Description: {errors.description.message}
        </p>
      )}

      {errors.amount && (
        <p className="error-text-secondary">Amount: {errors.amount.message}</p>
      )}
    </div>
  );
}
