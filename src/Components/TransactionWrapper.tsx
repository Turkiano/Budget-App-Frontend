import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import api from '@/api/api';
import { Form } from './Form';
import { useCategories } from '@/hooks/useCategories';
import {
  TRANSACTION_TYPES,
  TransactionCreatePayload,
  TransactionFormValues,
  TransactionType,
  TransactionWrapperProps,
} from '@/Types/Transaction';

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

  const { categories, createCategory, deleteCategory, updateCategory } =
    useCategories();

  const selectedType = watch('transcation_type');
  const selectedCategory = watch('categoryName');

  const categoryOptions = categories
    .filter((c) => c.category_type === selectedType)
    .map((c) => c.name);

  const finalCategoryOptions =
    categoryOptions.length > 0 ? categoryOptions : CATEGORY_FALLBACK_OPTIONS;

  useEffect(() => {
    if (categoryOptions.length === 0) {
      // Every category for this type was deleted; fall back to a valid value
      // instead of leaving the selection on a name that no longer resolves.
      if (!CATEGORY_FALLBACK_OPTIONS.includes(selectedCategory)) {
        setValue('categoryName', CATEGORY_FALLBACK_OPTIONS[0]);
      }
      return;
    }

    if (!categoryOptions.includes(selectedCategory)) {
      setValue('categoryName', categoryOptions[0]);
    }
  }, [selectedType, selectedCategory, categoryOptions, setValue]);

  // Category names are not unique across transaction types ("Food" can exist
  // under both Incomes and Expenses). The dropdown only lists categories of
  // the selected type, so lookups have to match on name AND type — otherwise
  // delete/edit can target a category the user never clicked.
  // Fallback options match nothing, so they are never deleted by accident.
  const resolveCategory = (categoryName: string) =>
    categories.find(
      (category) =>
        category.name === categoryName &&
        category.category_type === selectedType,
    );

  const handleDeleteCategory = (id: string) => {
    deleteCategory.mutate(id, {
      onError: (error) => {
        console.error('Failed to delete category', error);
      },
    });
  };

  const handleEditCategory = (id: string, name: string) => {
    const newName = window.prompt('New Category Name', name);

    if (!newName?.trim() || newName.trim() === name) return;

    updateCategory.mutate(
      { id, name: newName.trim() },
      {
        onError: (error) => {
          console.error('Failed to update category', error);
        },
      },
    );
  };

  const handleDeleteOption = (fieldName: string, option: string) => {
    if (fieldName === 'categoryName') {
      const category = resolveCategory(option);

      if (!category) return;

      handleDeleteCategory(category.category_id);
      return;
    }

    if (fieldName === 'transcation_type') {
      const next = transactionTypeOptions.filter((type) => type !== option);
      const final = next.length > 0 ? next : TRANSACTION_TYPES;
      setTransactionTypeOptions(final);

      if (selectedType === option) {
        setValue('transcation_type', final[0] as TransactionType);
      }
    }
  };

  const handleEditOptions = (fieldName: string, option: string) => {
    if (fieldName === 'categoryName') {
      // "Add New" passes an empty option — create a category for the
      // transaction type that is currently selected.
      if (!option) {
        const newName = window.prompt('Add a new category name')?.trim();

        if (!newName) return;

        createCategory.mutate(
          { name: newName, category_type: selectedType },
          {
            onError: (error) => {
              console.error('Failed to create category', error);
            },
          },
        );
        return;
      }

      const category = resolveCategory(option);

      if (!category) return;

      handleEditCategory(category.category_id, category.name);
      return;
    }

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

        await api.post('/transcations', payload);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          console.log('Status:', err.response?.status);
          console.log('Response:', err.response?.data);
          console.dir(err.response?.data, { depth: null });
          return;
        }

        console.error('Create transaction failed', err);
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
