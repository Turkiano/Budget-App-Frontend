import { useState } from 'react';
import './App.css';
import { Expense, ExpenseWrapper } from './Components/ExpenseWrapper';
import { Income, IncomeWrapper } from './Components/IncomeWrapper';
import { Link } from 'react-router-dom';

function App() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleDeleteIncome = () => {
    console.log("Deleting . . . ") //for testing the Delete function
    //01. Allocate which array to delete

    //02. Target Id to delete
    const id = '33897587-ee63-426a-a6b2-6a7300198e65';

    //03. Filter the array
    const updatedIncomes = incomes.filter((income) => {
      return income.id !== id;
    });

    //04. Update the State
    console.log(updatedIncomes);
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
        handleDelete={handleDeleteIncome}
      />
      <ExpenseWrapper expenses={expenses} setExpenses={setExpenses} handleDelete={handleDeleteIncome} />
    </div>
  );
}

export default App;
