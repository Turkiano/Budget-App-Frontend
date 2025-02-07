import { ChangeEvent, FormEvent, useState } from 'react';
import { Form } from './Form';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import '../Styling/IncomeWrapper.css';
import { ListItems } from './ListItems';

const IncomeSchema = z.object({
  source: z.string().min(3),
  amount: z.string(),
});

type IncomeSchemaType = z.infer<typeof IncomeSchema>;

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

type IncomeWrapperProps = {
  incomes: IncomeTypes[];
  setIncomes: (key: IncomeTypes[]) => void;
  handleDelete: (key: string) => void;
};

export function IncomeWrapper({
  incomes,
  setIncomes,
  handleDelete,
}: IncomeWrapperProps) {
  const [income, setIncome] = useState<IncomeTypes>({
    id: uuidv4(), // Generate a unique ID
    source: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0], // ISO format for <input type="date">
  });

  // console.log('income: ', income); //this is for testing our new Structure
  // console.log('newIncome: ', incomes);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(IncomeSchema) });
  console.log('Errors: ', errors);

 
    
  
  const onSubmit = (data) => {console.log('Data: ', data);
    
    setIncomes([...incomes, data]);// to update the income state
  
  }



  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input className="input" placeholder="source" {...register('source')} />
        {errors.source && <span>{errors.source.message}</span>}
        <input
          className="input"
          placeholder="amount"
          {...register('amount')}
        />
        {errors.amount && <span>{errors.amount.message}</span>}

        <button type="submit">Submit</button>
      </form>

      {/* <Form
        handleChange={handleChange}
        handleSubmit={handleSubmitOld}
        handleChangeDate={handleChangeDate}
        inputs={INCOME_INPUTS}
        buttonLabel="Add Income"
      /> */}

      <ListItems items={incomes} handleDelete={handleDelete} />
    </>
  );
}
