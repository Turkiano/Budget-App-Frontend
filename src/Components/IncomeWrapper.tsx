import '../Styling/IncomeWrapper.css';

import { useState } from 'react';
import { IncomeForm } from './IncomeForm';

type Income = {
  source: string;
  amount: number;
  date: string;
};
export function IncomeWrapper() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [income, setIncome] = useState<Income>({
    source: '',
    amount: 0,
    date: new Date().toLocaleDateString(),
  });

  console.log('income: ', income); //this is for testing our new Structure

  const handelChange = (e) => {
    const { name, value } = e.target;
    setIncome({
      ...income,
      [name]: value,
    });
  };

  const handelChangeDate = (e) => {
    setIncome({
      ...income,
      date: new Date(e.target.value),
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const newIncome: Income = {
      source: income.source,
      amount: income.amount,
      date: income.date,
    };
    setIncomes([...incomes, newIncome]);
    console.log('incomes: ', newIncome);
  };

  return (
    <>
      <IncomeForm
        handelChange={handelChange}
        handelSubmit={handelSubmit}
        handelChangeDate={handelChangeDate}
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
