import { useState } from 'react';
import './App.css';
import { Expense, ExpenseWrapper } from './Components/ExpenseWrapper';
import { Income, IncomeWrapper } from './Components/IncomeWrapper';
import { Link } from 'react-router-dom';

function App() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleDeleteItems = () => {
    //01. Allocate which array to delete

    //02. Target Id to delete
    const id = "5efb5af3-1454-480f-9312-ff5e8a11da7a";

    //03. Filter the array
    const updatedIncomes = incomes.filter((income) => {
      return income.id !== id;
    });

    //04. Update the State
    setIncomes(updatedIncomes);
    setExpenses(updatedIncomes);
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
      <Link to="/income/1">Income</Link>

      <IncomeWrapper
        incomes={incomes}
        setIncomes={setIncomes}
        handleDelete={handleDeleteItems}
      />
      <ExpenseWrapper
        expenses={expenses}
        setExpenses={setExpenses}
        handleDelete={handleDeleteItems}
      />
    </div>
  );
}

export default App;
