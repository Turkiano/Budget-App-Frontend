import api from '@/api/api';
import { Form } from './Form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AllTranscationTypes } from '../App';
import { UserTypes } from '@/Types/User';

const ExpenseSchema = z.object({
  source: z.string().min(3),
  amount: z.string().min(1),
  date: z.string(),
});

export type ExpenseSchemaType = z.infer<typeof ExpenseSchema>;



const EXPENSE_INPUTS = [
  {
    name: 'source',
    id: 'source',
    placeholder: 'Expense source',
  },
  {
    name: 'amount',
    id: 'amount',
    placeholder: 'Amount of Expense',
  },
];

export type ExpenseWrapperProps = {
  expenses?: AllTranscationTypes[];
  setState?: (key: AllTranscationTypes[]) => void;
  handleDelete?: (key: string) => void;
  user: UserTypes;
};

export function ExpenseWrapper({
  expenses,
  setState,
  handleDelete,
  user,
}: ExpenseWrapperProps) {

  const onSubmit = (data: AllTranscationTypes) => {
    const createTransaction = async () => {
      try {
        const categoriesRes = await api.get('/categorys');
        const categories = categoriesRes.data as any[];
        const categoryId = categories?.[0]?.Category_id || categories?.[0]?.category_id || categories?.[0]?.categoryId;

        const payload = {
          Date: data.date,
          Amount: Number(data.amount),
          Description: data.source,
          Transcation_type: 'Expenses',
          CategoryId: categoryId,
        };

        await api.post('/transcations', payload);
      } catch (err) {
        console.error('Create expense failed', err);
      }
    };

    void createTransaction();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseSchemaType>({ resolver: zodResolver(ExpenseSchema) });
  console.log('Errors: ', errors);

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 shadow-2xl shadow-slate-950/40">
      <Form
        handleChangeDate={() => null}
        register={register}
        handleSubmit={handleSubmit}
        inputs={EXPENSE_INPUTS}
        onSubmit={onSubmit}
        buttonLabel='Add Expense'
        titleLabel='Expense Input'
      />
      {errors.source && (
        <p className="mt-3 text-sm text-rose-400">Source: {errors.source.message}</p>
      )}
      {errors.amount && (
        <p className="mt-2 text-sm text-rose-400">Amount: {errors.amount.message}</p>
      )}
    </div>
  );
}
