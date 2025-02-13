import '../Styling/ExpenseWrapper.css';

import { Form } from './Form';
import { ListItems } from './ListItems';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ExpenseSchema = z.object({
  source: z.string().min(3),
  amount: z.string().min(1),
  date: z.string(),
});

export type ExpenseSchemaType = z.infer<typeof ExpenseSchema>;

export type ExpenseTypes = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

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
  expenses: ExpenseTypes[];
  setState: (key: ExpenseTypes[]) => void;
  handleDelete: (key: string) => void;
};

export function ExpenseWrapper({
  expenses,
  setState,
  handleDelete,
}: ExpenseWrapperProps) {
  // const [expense, setExpense] = useState<ExpenseTypes>({
  //   id: uuidv4(),
  //   source: '',
  //   amount: 0,
  //   date: new Date().toISOString().split('T')[0], // ISO format for <input type="date">
  // });

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setExpense({
  //     ...expense,
  //     [name]: value,
  //   });
  // };

  // const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
  //   setExpense({
  //     ...expense,
  //     date: e.target.value,
  //   });
  // };

  const onSubmit = (data: ExpenseTypes) => {
    const newExpense: ExpenseTypes = {
          id: crypto.randomUUID(), // Ensure a unique ID
          source: data.source,
          amount: Number(data.amount),
          date: data.date,
        };
    setState((prevState) => {
      return {
        ...prevState,
        expenses: [...prevState.expenses, newExpense],
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
