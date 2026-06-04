
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import api from '@/api/api';
import { Form } from './Form';
import { BudgetContextState } from './Router';
import { AllTranscationTypes } from '../App';
import { UserTypes } from '@/Types/User';

const IncomeSchema = z.object({
  source: z.string().min(3),
  amount: z.string().min(1),
  date: z.string(),
});

export type IncomeSchemaType = z.infer<typeof IncomeSchema>;

export type titleLable = {
  label: string;
};



const INCOME_INPUTS = [
  {
    name: 'source',
    id: 'source',
    placeholder: 'Income source ',
  },
  {
    name: 'amount',
    id: 'amount',
    placeholder: 'Income amount ',
  },
];

export type IncomeWrapperProps = {
  incomes?: AllTranscationTypes[];
  setState?: (key: BudgetContextState[]) => void;
  handleDelete?: (key: string) => void;
  user: UserTypes;
};

export function IncomeWrapper({
  incomes,
  setState,
  handleDelete,
  user,
}: IncomeWrapperProps) {
  



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncomeSchemaType>({ resolver: zodResolver(IncomeSchema) });
  console.log('Errors: ', errors);

  const onSubmit = (data: AllTranscationTypes) => {
    // Try to create transaction on backend. We'll pick a fallback category if available.
    const createTransaction = async () => {
      try {
        const categoriesRes = await api.get('/categorys');
        const categories = categoriesRes.data as any[];
        const categoryId = categories?.[0]?.Category_id || categories?.[0]?.category_id || categories?.[0]?.categoryId;

        const payload = {
          Date: data.date,
          Amount: Number(data.amount),
          Description: data.source,
          Transcation_type: 'Incomes',
          CategoryId: categoryId,
        };

        await api.post('/transcations', payload);
      } catch (err) {
        console.error('Create income failed', err);
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
        inputs={INCOME_INPUTS}
        onSubmit={onSubmit}
        buttonLabel='Add Income'
        titleLabel='Income Input'
      />
      {errors.source && <p className='mt-3 text-sm text-rose-400'>Source: {errors.source.message}</p>}
      {errors.amount && <p className='mt-2 text-sm text-rose-400'>Amount: {errors.amount.message}</p>}
    </div>
  );
}
