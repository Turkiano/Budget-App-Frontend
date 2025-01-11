import '../Styling/ExpenseWrapper.css';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Form } from './Form';
import { v4 as uuidv4 } from 'uuid';
import { ListItems } from './ListItems';

export type Expense = {
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

export function ExpenseWrapper() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expense, setExpense] = useState<Expense>({
    id: uuidv4(),
    source: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0], // ISO format for <input type="date">
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setExpense({
      ...expense,
      date: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isNaN(Number(expense.amount))) {
      alert('Please enter a valid number for the amount.');
      return;
    }
    const newExpense: Expense = {
      id: uuidv4(),
      source: expense.source,
      amount: Number(expense.amount),
      date: expense.date,
    };
    setExpenses([...expenses, newExpense]);
    setExpense({
      id: uuidv4(),
      source: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
    });
    console.log('NewExpense: ', newExpense);
  };

  return (
    <>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeDate={handleChangeDate}
        inputs={EXPENSE_INPUTS}
         buttonLabel="Add Expense"
      />
     <ListItems items={expenses}/> 
    </>
  );
}
