import '../Styling/IncomeWrapper.css';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Form } from './Form';
import { v4 as uuidv4 } from 'uuid'; // Install uuid with `npm install uuid`
import { ListItems } from './ListItems';

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
  incomes: IncomeTypes[]
  setIncomes: (key: IncomeTypes[])=> void
  handleDelete: (key: string)=> void
}

export function IncomeWrapper({incomes, setIncomes, handleDelete}: IncomeWrapperProps) {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newIncome: IncomeTypes = {
      id: uuidv4(), // Ensure a new unique ID
      source: income.source,
      amount: Number(income.amount),
      date: income.date,
    };
    setIncomes([...incomes, newIncome]);
    // setIncome({
    //   id: uuidv4(),
    //   source: '',
    //   amount: 0,
    //   date: new Date().toLocaleDateString(),
    // }); // Reset the form values
    console.log('NewIncome: ', newIncome);
  };

  return (
    <>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeDate={handleChangeDate}
        inputs={INCOME_INPUTS}
        buttonLabel="Add Income"
        
      />

     <ListItems items={incomes} handleDelete={handleDelete}/>
    </>
  );
}
