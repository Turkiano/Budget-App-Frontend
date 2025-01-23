import { useState } from 'react';
import './App.css';
import { Expense, ExpenseWrapper } from './Components/ExpenseWrapper';
import { Income, IncomeWrapper } from './Components/IncomeWrapper';
import { Link } from 'react-router-dom';
import { SavingWrapper } from './Components/SavingWrapper';

function App() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleDeleteItems = (id: string, type: 'income' | 'expense') => {
   if (type === 'income'){
    const updateIncomes = incomes.filter((income) => income.id !== id);
    setIncomes(updateIncomes);

   } else if (type === 'expense'){
    const updatedExpenses = expenses.filter((expense)=> expense.id !== id)
    setExpenses(updatedExpenses);
   }
  };  

  //way 01 Using [Income] to get the total
  let totalIncome = 0;
  incomes.forEach((income) => {
    totalIncome += income.amount;
  });

  //way 02 Using [Expense]  to get the total
  const totalExpense = expenses.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  // to get the balance
  const balance = totalIncome - totalExpense;
  console.log('Balance is: ', balance);

  return (
    <div className="App">
      <h1>Budget App</h1>
      <h3>Balance: {balance}</h3>
      <Link to="/income/1">Income</Link>

      <IncomeWrapper
        incomes={incomes}
        setIncomes={setIncomes}
        handleDelete={(id)=>handleDeleteItems(id, 'income')}
      />
      <ExpenseWrapper
        expenses={expenses}
        setExpenses={setExpenses}
        handleDelete={(id)=>handleDeleteItems(id, 'expense')}
      />

      <SavingWrapper></SavingWrapper>
   
    </div>
  );
}

export default App;
