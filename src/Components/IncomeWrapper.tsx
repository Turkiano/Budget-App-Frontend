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

  const [source, setSource] = useState('');
  const [amount, setAmount] = useState(0);
  // const [date, setDat] = useState(null);

  const handelChangeSource = (e) => {
    const value = e.target.value;
    setSource(value);
  };

  const handelChangeAmount = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const newIncome = {
      source: source,
      amount: amount,
      date: new Date().toLocaleDateString(),
    };
    setIncomes([...incomes, newIncome]);
    console.log('incomes: ', newIncome);
  };

  return (
    <>
      <IncomeForm
        handelChangeAmount={handelChangeAmount}
        handelChangeSource={handelChangeSource}
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
