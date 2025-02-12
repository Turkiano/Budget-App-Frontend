
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import '../Styling/IncomeWrapper.css';
import { ListItems } from './ListItems';
import { Form } from './Form';
import { BudgetContextState } from './Router';

const IncomeSchema = z.object({
  source: z.string().min(3),
  amount: z.string().min(1),
  date: z.string(),
});

export type IncomeSchemaType = z.infer<typeof IncomeSchema>;

export type IncomeTypes = {
  id: string;
  source: string;
  amount: number;
  date: string;
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
  incomes: IncomeTypes[];
  setState: (key: BudgetContextState[]) => void;
  handleDelete: (key: string) => void;
};

export function IncomeWrapper({
  incomes,
  setState,
  handleDelete, 
}: IncomeWrapperProps) {
  



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncomeSchemaType>({ resolver: zodResolver(IncomeSchema) });
  console.log('Errors: ', errors);

  const onSubmit = (data: IncomeTypes) => {
    const newIncome: IncomeTypes = {
      id: crypto.randomUUID(), // Ensure a unique ID
      source: data.source,
      amount: Number(data.amount),
      date: data.date,
    };
    // console.log('Data: ', data);

    setState((prevData) =>{

      return {
          ...prevData,
      incomes: [...prevData.incomes, newIncome]

      }
    
    }); // to up)date the income state
  };

  return (
    <>
      {/* <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input className="input" placeholder="source" {...register('source')} />
        {errors.source && <span>{errors.source.message}</span>}
        <input className="input" placeholder="amount" {...register('amount')} />
        {errors.amount && <span>{errors.amount.message}</span>}

        <button type="submit">Submit</button>
      </form> */}

     <Form  
      handleChangeDate={()=>null}
      register={register}
      handleSubmit={handleSubmit}
      inputs={INCOME_INPUTS}
      onSubmit={onSubmit}
      buttonLabel='Add Income'
      />
      {errors.source && <span className='errors'> Source: {errors.source.message}</span>}
            {errors.amount && <span className='errors'>Amount: {errors.amount.message}</span>}
      <ListItems items={incomes} handleDelete={handleDelete} />
    </>
  );
}
