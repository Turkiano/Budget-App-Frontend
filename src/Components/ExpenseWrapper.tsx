import '../Styling/ExpenseWrapper.css';

import { Form } from './Form';
import { ListItems } from './ListItems';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AllTranscationTypes } from '../App';

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
  expenses: AllTranscationTypes[];
  setState: (key: AllTranscationTypes[]) => void;
  handleDelete: (key: string) => void;
};

export function ExpenseWrapper({
  expenses,
  setState,
  handleDelete,
}: ExpenseWrapperProps) {

  const onSubmit = (data: AllTranscationTypes) => {
    const newExpense: AllTranscationTypes = {
          id: crypto.randomUUID(), // Ensure a unique ID
          source: data.source,
          amount: Number(data.amount),
          date: data.date,
        };

        const withType = {
          ...newExpense,
          type: "Expense"
        }
        
    setState((prevState) => {
      return {
        ...prevState,
        expenses: [...prevState.expenses, withType],
      };
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseSchemaType>({ resolver: zodResolver(ExpenseSchema) });
  console.log('Errors: ', errors);

  return (
    <>
      <Form
        handleChangeDate={() => null}
        register={register}
        handleSubmit={handleSubmit}
        inputs={EXPENSE_INPUTS}
        onSubmit={onSubmit}
        buttonLabel= "Add Expense"
      />
      {errors.source && (
        <span className="errors"> Source: {errors.source.message}</span>
      )}
      {errors.amount && (
        <span className="errors">Amount: {errors.amount.message}</span>
      )}
      <ListItems items={expenses} handleDelete={handleDelete} />
    </>
  );
}
