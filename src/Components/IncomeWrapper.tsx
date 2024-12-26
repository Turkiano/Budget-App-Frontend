import '../Styling/IncomeWrapper.css';

import { useState } from 'react';
import { IncomeForm } from './IncomeForm';

type income = {
  source: string;
  amount: number;
  date: string;
};
export function IncomeWrapper() {
  const [incomes, setIncomes] = useState<income[]>([]);
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: new Date(),
  });

 

  console.log('income: ', income); //this is for testing our new Structure

  const handelChange = (e) => {

    if (e.target.type === 'date') { //01.Checks if the input type is date.
      const dateValue = new Date(e.target.value); //02. Converts string input into a Date object
      //03.Formats the Date object to a human-readable date string.
      console.log("testing date: ", dateValue.toLocaleDateString());
    } else {
      console.log("testing other input: ", e.target.value);
    }    

    const {name, value} = e.target;
    setIncome({
      ...income,
      [name]: value,
    });
  };

 

  const handelSubmit = (e) => {
    e.preventDefault();
    const newIncome = {
      source: income.source, //here is the updated syntax
      amount: income.amount,//here is the updated syntax
      date: new Date().toLocaleDateString(),
    };
    setIncomes([...incomes, newIncome]);
    console.log('incomes: ', newIncome);
  };

  return (
    <>
      <IncomeForm
        handelChange={handelChange}
        handelSubmit={handelSubmit}
      />

      <ul className="details">
        {incomes.map((income) => {
          return (
            <li className="detail-item">
              <span className="income-source">{income.source}</span>
              <span className="income-amount">SAR {income.amount}</span>
              <span className="income-date">{income.date}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
