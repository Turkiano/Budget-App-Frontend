import '../Styling/IncomeWrapper.css';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Form } from './Form';
import { v4 as uuidv4 } from 'uuid'; // Install uuid with `npm install uuid`


type Income = {
  id: string
  source: string;
  amount: number;
  date: string;
};
 const INCOME_INPUTS = [
   {
    name: "source",
    id: "source",
    placeholder: "Income source "
   },
   {
    name: "amount",
    id: "amount",
    placeholder: "Income amount "
   }]

   const EXPENSE_INPUTS = [
    {
     name: "source",
     id: "source",
     placeholder: "Expense source "
    },
    {
     name: "amount",
     id: "amount",
     placeholder: "Amount of Expense "
    },
  
]
export function IncomeWrapper() { 
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [income, setIncome] = useState<Income>({
    id: uuidv4(), // Generate a unique ID
    source: '',
    amount: 0,
    date: new Date().toLocaleDateString(),
  });

  // console.log('income: ', income); //this is for testing our new Structure
  // console.log('newIncome: ', incomes);

   const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIncome({
      ...income,
      [name]: value,
    });
  };

  const handelChangeDate = (e: {target:  Date}) => {
    setIncome({
      ...income,
      date: new Date(e.target.valueOf()).toLocaleDateString(),
        });
  };

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newIncome: Income = {
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
        handelChange={handelChange}
        handelSubmit={handelSubmit}
        handelChangeDate={handelChangeDate}
        inputs={INCOME_INPUTS}
        
      />
      <Form
        handelChange={handelChange}
        handelSubmit={handelSubmit}
        handelChangeDate={handelChangeDate}
        inputs={EXPENSE_INPUTS}
        
      />
     

      <ul className="details" >
        {incomes.map((income) => {
          return (
            <li  className="detail-item" key={income.id}>
              <span className="income-source" >{income.source} </span>
              <span className="income-amount">SAR {income.amount}</span>
              <span className="income-date">{income.date}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
