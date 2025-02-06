import { ChangeEvent, FormEvent, useState } from 'react';
import { Form } from './Form';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import '../Styling/IncomeWrapper.css';
import { ListItems } from './ListItems';

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIncome({
      ...income,
      [name]: value,
    });
  };

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setIncome({
      ...income,
      date: e.target.value,
    });
  };

  const handleSubmitOld = (e: FormEvent) => {
    e.preventDefault();
    const newIncome: IncomeTypes = {
      id: uuidv4(), // Ensure a new unique ID
      source: income.source,
      amount: Number(income.amount),
      date: income.date,
    };
    setIncomes([...incomes, newIncome]);

    console.log('NewIncome: ', newIncome);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver<SignUpSchemaType>(SignUpSchema) });
  console.log('Errors: ', errors);

  const onSubmit = (data) => console.log('Data: ', data);

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input className="input" placeholder="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          className="input"
          placeholder="password"
          {...register('password')}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit">Submit</button>
      </form>

      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmitOld}
        handleChangeDate={handleChangeDate}
        inputs={INCOME_INPUTS}
        buttonLabel="Add Income"
      />

      <ListItems items={incomes} handleDelete={handleDelete} />
    </>
  );
}
