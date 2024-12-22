import { useState } from 'react';
import './App.css';
import { IncomeForm } from './Components/IncomeForm';

function App() {
  const [incomes, setIncomes] = useState([]);

  const [source, setSource] = useState('');
  // const [amount, setAmount] = useState(0);
  // const [date, setDat] = useState(null);

  const handelChangeSource = (e) => {
    const value = e.target.value;
    setSource(value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const newIncome = {
      source: source,
      amount: 0,
      date: new Date().toLocaleDateString(),
    };
    setIncomes([...incomes, newIncome]);
    console.log('incomes: ', newIncome);
  };

  return (
    <div className="App">
      <h1>Budget App</h1>
      <IncomeForm
        handelChangeSource={handelChangeSource}
        handelSubmit={handelSubmit}
      />
    </div>
  );
}

export default App;
