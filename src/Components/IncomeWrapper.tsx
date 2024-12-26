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

    console.log("testing date: " , e.toLocaleDateString);
    

    // const {name, value} = e.target;
    // setIncome({
    //   ...income,
    //   [name]: value,
    // });
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
