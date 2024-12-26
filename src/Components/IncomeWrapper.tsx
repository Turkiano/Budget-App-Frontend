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

  const [source, setSource] = useState('');
  const [amount, setAmount] = useState(0);
  // const [date, setDat] = useState(null);

  console.log('income: ', income); //this is for testing our new Structure

  const handelChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setIncome({
      ...income,
      [name]: value,
    });
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
        handelChangeAmount={handelChange}
        handelChangeSource={handelChange}
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
